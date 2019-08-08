import React, { Component } from 'react';
import * as bodyActionCreator from "../store/actions/body";
import { connect } from "react-redux";
import {Col, ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import MenuItemContent from '../components/menu_item_content'
import { setShowAddMetric } from "../store/actions/body";
import MenuItemAdd from '../components/form/menu_item_add'
import OutsideAction from '../utils/outside_action'
import {setEditDataFlag} from "../store/actions/body";
import {setAddDataFlag} from "../store/actions/body";
import {clearEditDataFailure} from "../store/actions/body";

class MenuItems extends Component {

    handleItemSelection(val) {
        this.props.setMenuItemIndex(val)
    }

    render() {
        const addedParams = this.props.summaryItems.map(val => val.parameter.name);
        let items;
        if (this.props.isLoading) {
            items = <Spinner color="secondary"/>
        } else if (this.props.summaryItems.length > 0) {
            items = this.props.summaryItems.map((obj, ind) => {
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
                <ListGroupItem className='hover-background short-row'
                               onClick={() => this.props.setShowAddMetric(true)}>
                    <span role="img" aria-label="plus">&#x2795; Add metrics to track</span>
                </ListGroupItem>
                { this.props.showAddMetric ?
                    (<ListGroupItem className='hover-background'
                        // onClick={() => this.props.setShowAddMetric(true)}
                    >
                        <OutsideAction
                            action={() => {
                                this.props.setShowAddMetric(false);
                                // this.props.clearEditDataFailure();
                            }}
                        >
                        <MenuItemAdd
                            toggle={() => {this.props.setShowAddMetric(!this.props.body.showAddMetric)}}
                            isOpen={this.props.showAddMetric}
                            availParams={this.props.allParams.filter(x => !addedParams.includes(x.name))}
                            summaryItems={this.props.summaryItems}
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
        summaryItems: state.profile.summaryItems,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMenuItemIndex: (val) => dispatch(bodyActionCreator.setMenuItemIndex(val)),
        setShowAddMetric: (val) => dispatch(setShowAddMetric(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItems);