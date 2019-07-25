import React, { Component } from 'react';
import * as bodyActionCreator from "../store/actions/body";
import * as profileActionCreator from "../store/actions/profile";
import {connect} from "react-redux";
import {Col, ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import MenuItemContent from '../components/menu_item_content'

class MenuItems extends Component {

    handleItemSelection(val) {
        this.props.setMenuItemIndex(val)
    }

    render() {
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
            <React.Fragment>
            <ListGroup className='menu-items-list'>
                {items}
            </ListGroup>
            <ListGroup>
                <ListGroupItem className='hover-background menu-items-list'>
                    <span role="img" aria-label="plus">&#x2795; Add data points</span>
                </ListGroupItem>
                </ListGroup>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        selItemInd: state.body.selectedItemIndex,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMenuItemIndex: (val) => dispatch(bodyActionCreator.setMenuItemIndex(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItems);