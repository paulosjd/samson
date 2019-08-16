import React, { Component } from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import { postMenuItemAdd } from "../store/actions/profile";
import MenuItemContent from '../components/body/menu_item_content'
import MenuItemAdd from '../components/form/menu_item_add'
import OutsideAction from '../utils/outside_action'
import * as bodyActionCreator from "../store/actions/body";

class MenuItems extends Component {

    handleItemSelection(val) {
        this.props.setMenuItemIndex(val)
    }

    render() {
        const blankItems = this.props.blankParams.map(x => {return {
            parameter: x, data_point: {date: '', value: '', value2: ''}
        }});
        const menuItems = this.props.summaryItems.concat(blankItems);
        const addedParams = menuItems.map(val => val.parameter.name);
        const availParams = this.props.allParams.filter(x => !addedParams.includes(x.name));
        let items;
        if (this.props.isLoading) {
            items = <Spinner color="secondary"/>
        } else if (menuItems.length > 0) {
            items = menuItems.map((obj, ind) => {
                return (
                    <ListGroupItem key={ind} action
                                   onClick={this.handleItemSelection.bind(this, ind)}
                                   className={this.props.selItemInd === ind ? 'selected-menu-item' : ''}
                    >
                        <MenuItemContent
                            isSelected={this.props.selItemInd === ind}
                            date={obj.data_point.date}
                            label={obj.parameter.name}
                            value={obj.data_point.value}
                            value2={obj.data_point.value2}
                            unit_symbol={' ('.concat(obj.parameter.unit_symbol, ')')}
                        />
                    </ListGroupItem>)
            })
        } else {
            items = <h2>You need to add items</h2>
        }
        return (
            <ListGroup className='menu-items-list'>
                {items}
                { !this.props.showAddMetric && availParams.length > 0 && (
                <ListGroupItem className='hover-background short-row'
                               onClick={() => this.props.setShowAddMetric(true)}>
                    <span role="img" aria-label="plus">&#x2795; Add metrics to track</span>
                </ListGroupItem>)}
                { this.props.showAddMetric && availParams.length > 0 ?
                    (<ListGroupItem className='hover-background'>
                        <OutsideAction action={() => {this.props.setShowAddMetric(false)}}>
                            <MenuItemAdd
                                toggle={() => {this.props.setShowAddMetric(!this.props.body.showAddMetric)}}
                                isOpen={this.props.showAddMetric}
                                availParams={availParams}
                                postMenuItemAdd={this.props.postMenuItemAdd}
                                setShowAddMetric={this.props.setShowAddMetric}
                            />
                        </OutsideAction>
                </ListGroupItem>) : null}
            </ListGroup>
        )
    }
}

const mapStateToProps = state => {
    return {
        selItemInd: state.body.selectedItemIndex,
        showAddMetric: state.body.showAddMetric,
        allParams: state.profile.allParams,
        blankParams: state.profile.blankParams,
        summaryItems: state.profile.summaryItems,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMenuItemIndex: (val) => dispatch(bodyActionCreator.setMenuItemIndex(val)),
        setShowAddMetric: (val) => dispatch(bodyActionCreator.setShowAddMetric(val)),
        postMenuItemAdd: (val) => dispatch(postMenuItemAdd(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItems);