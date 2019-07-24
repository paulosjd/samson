import React, { Component } from 'react';
import {connect} from "react-redux";
import { Container, Row, Col } from 'reactstrap';
import MenuItems from './menu_items'
import NavItems from './nav_items'
import Summary from '../components/summary'
import Feature from './feature'
import * as actionCreator from "../store/actions/profile";
import { setFeatItemIndex } from "../store/actions/body";

class MainBody extends Component {

    componentDidMount() {
        this.props.fetchProfileSummaryBegin();
        this.props.fetchProfileSummary()
    }

    render() {

        if ( this.props.error ) {
            console.log(this.props.error)
            return <div>{'ERROR!!!  ' + this.props.error}</div>
        }
        if (Object.values(this.props.menu).includes(true)) {
            return <NavItems props={this.props}/>
        }
        return (
            <Container>
                <Row>
                    <Col xs="3" style={{paddingLeft: 0, paddingRight: 0}}>
                        <MenuItems
                            isLoading={this.props.loading}
                            summaryItems={this.props.summaryItems}
                        />
                    </Col>
                    <Col xs="4" style={{paddingLeft: 0, paddingRight: 0}}>
                        <Summary
                            body={this.props.body}
                            isLoading={this.props.loading}
                            summaryItems={this.props.summaryItems}
                            selectedParameter={this.props.selectedParameter}
                        />
                    </Col>
                    <Col xs="5" style={{paddingLeft: 0, paddingRight: 0}}>
                        <Feature
                            dataPoints={this.props.dataPoints}
                            body={this.props.body}
                            selectedParameter={this.props.selectedParameter}
                            setFeatItemIndex={this.props.setFeatItemIndex}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({auth, body, extras, menu, profile}) => {
    return {
        body: body,
        profile: profile,
        extras: extras,
        error: profile.error,
        loading: profile.loading,
        dataPoints: profile.dataPoints || [],
        selectedParameter: profile.summaryItems[body.selectedItemIndex]
            ? profile.summaryItems[body.selectedItemIndex].parameter : '',
        summaryItems: profile.summaryItems || [],
        menu: menu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileSummaryBegin: () => dispatch(actionCreator.fetchProfileSummaryBegin()),
        fetchProfileSummary: () => dispatch(actionCreator.fetchProfileSummary()),
        setFeatItemIndex: (val) => {console.log(val); dispatch(setFeatItemIndex(val)) }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainBody);