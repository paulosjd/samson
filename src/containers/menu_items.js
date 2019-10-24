import React, { Component } from 'react';
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Spinner} from 'reactstrap';
import MenuItemContent from '../components/body/menu_item_content'
import MenuItemAdd from '../components/form/menu_item_add'
import CustomMetricAdd from '../components/form/custom_metric_add'
import { getColorData } from '../utils/helpers'
import OutsideAction from '../utils/outside_action'
import * as bodyActionCreator from "../store/actions/body";
import { postMenuItemAdd, postCustomMenuItemAdd, clearLoadError } from "../store/actions/profile";

class MenuItems extends Component {

    getLatestDpForPName(name) {
        for (let dp of this.props.dataPoints) {
            if (dp.parameter === name) {
                return dp
            }
        }
    }

    render() {
        const menuItems = this.props.summaryItems.concat(this.props.blankItems);
        const addedParams = menuItems.map(val => val.parameter.name);
        const availParams = this.props.allParams.filter(x => !addedParams.includes(x.name));
        let items;
        if (this.props.isLoading) {
            items = <Spinner color="secondary sum-spin"/>
        } else if (menuItems.length > 0) {
            items = menuItems.map((obj, ind) => {
                let { date, value, value2 } = obj.data_point || {};
                if (!date || !value || this.props.editedDpParams.includes(obj.parameter.name)) {
                    ({ date, value, value2 } = this.getLatestDpForPName(obj.parameter.name) || {})
                }
                const colorData = getColorData(this.props.unitInfo, obj.parameter.name);
                const paramIdealInd = this.props.ideals.findIndex(x => x.param_name === obj.parameter.name);
                const paramIdeals = this.props.ideals[paramIdealInd];
                return (
                    <ListGroupItem
                        key={ind} action
                        onClick={() => {
                            this.props.setMenuItemIndex(ind);
                            this.props.hideAddQualifier();
                            this.props.hideLinkedParamAdd();
                            this.props.resetChartSelection()
                        }}
                        className={this.props.selItemInd === ind ? 'selected-menu-item' : ''}
                    >
                        <MenuItemContent
                            date={date}
                            label={obj.parameter.name}
                            value={value}
                            value2={value2}
                            unit_symbol={' ('.concat(obj.parameter.unit_symbol, ')')}
                            valColor={colorData.valColor}
                            paramIdeals={paramIdeals}
                            colorRangeVal1={colorData.rangeVal1}
                            colorRangeVal2={colorData.rangeVal2}
                        />
                    </ListGroupItem>)
            })
        } else {
            items = <h2>Add metrics to begin tracking</h2>
        }

        return (
            <ListGroup className='menu-items-list'>
                { !this.props.showAddMetric && availParams.length > 0 && (
                    <ListGroupItem
                        className='hover-background med-row'
                        onClick={() => this.props.setShowAddMetric(true)}
                    >
                        <span role="img" aria-label="plus">&#x2795; Add metrics to track</span>
                    </ListGroupItem>)}

                { (!this.props.showAddMetric && availParams.length === 0) || (
                    this.props.showAddMetric && !this.props.metricAddFormHasValue) ? (
                    <ListGroupItem
                        className='med-row lh12 bkg-light-blue' id='custom_metric_add_btn'
                        onClick={() => this.props.setShowAddCustomMetric(!this.props.showAddCustomMetric)}
                    ><span id='custom_metric_add_btn' role="img" aria-label="plus"
                    >&#x2795; Add custom metric</span></ListGroupItem>) : null }

                { this.props.showAddMetric && availParams.length > 0 ? (
                    <ListGroupItem className='hover-background'>
                        <OutsideAction
                            ignoreId='custom_metric_add_btn'
                            action={() => {
                                this.props.setShowAddMetric(false);
                                this.props.setMetricAddFormHasValue(false)
                            }}
                            targetId={'custom_metric_add_btn'}
                            onTargetIdMatch={() => this.props.setShowAddCustomMetric(true)}
                        >
                            <MenuItemAdd
                                availParams={availParams}
                                postMenuItemAdd={this.props.postMenuItemAdd}
                                setShowAddMetric={this.props.setShowAddMetric}
                                setMetricAddFormHasValue={this.props.setMetricAddFormHasValue}
                            />
                        </OutsideAction>
                    </ListGroupItem>
                ) : this.props.showAddCustomMetric ? (
                    <ListGroupItem className='hover-background'>
                        <OutsideAction action={() => {
                            this.props.setShowAddCustomMetric(false);
                            this.props.setMetricAddFormHasValue(false);
                            this.props.clearLoadError()
                        }}>
                            <CustomMetricAdd
                                toggle={() => this.props.setShowAddCustomMetric(!this.props.showAddCustomMetric)}
                                isOpen={this.props.showAddCustomMetric}
                                availParams={availParams}
                                postMenuItemAdd={this.props.postCustomMenuItemAdd}
                                customItemSaveError={this.props.customItemSaveError}
                                setShowAddMetric={this.props.setShowAddMetric}
                                setMetricAddFormHasValue={this.props.setMetricAddFormHasValue}
                                clearSaveError={this.props.clearLoadError}
                            />
                        </OutsideAction>
                    </ListGroupItem>) : null}

                {items}

            </ListGroup>
        )
    }
}

const mapStateToProps = state => {
    return {
        selItemInd: state.body.selectedItemIndex,
        showAddMetric: state.body.showAddMetric,
        showAddCustomMetric: state.body.showAddCustomMetric,
        allParams: state.profile.allParams,
        blankParams: state.profile.blankParams,
        summaryItems: state.profile.summaryItems,
        dataPoints: state.profile.dataPoints || [],
        editedDpParams: state.body.editedDataPointParams,
        unitInfo: state.profile.unitInfo,
        ideals: state.profile.ideals,
        metricAddFormHasValue: state.body.metricAddFormHasValue,
        customItemSaveError: state.profile.loadError,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMenuItemIndex: (val) => dispatch(bodyActionCreator.setMenuItemIndex(val)),
        setShowAddMetric: (val) => dispatch(bodyActionCreator.setShowAddMetric(val)),
        setMetricAddFormHasValue: (val) => dispatch(bodyActionCreator.setMetricAddFormHasValue(val)),
        setShowAddCustomMetric: (val) => dispatch(bodyActionCreator.setShowAddCustomMetric(val)),
        postMenuItemAdd: (val) => dispatch(postMenuItemAdd(val)),
        postCustomMenuItemAdd: (val) => dispatch(postCustomMenuItemAdd(val)),
        hideAddQualifier: () => dispatch(bodyActionCreator.setShowAddQualifier(false)),
        hideLinkedParamAdd: () => dispatch(bodyActionCreator.setShowLinkedParamAdd(false)),
        resetChartSelection: () => dispatch(bodyActionCreator.resetChartSelection()),
        clearLoadError: () => dispatch(clearLoadError()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItems);