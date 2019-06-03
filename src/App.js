import React, { Component } from 'react';
import { connect } from "react-redux";
import AuthService from './components/auth/auth_service';
import withAuth from './components/auth/with_auth';
import TopNav from './containers/top_nav';
import MainBody from './containers/main_body';
// import * as actionCreator from "../../store/actions/profile";

const Auth = new AuthService();

class App extends Component {

    handleLogout(){
        Auth.logout();
        this.props.history.replace('/login');

    }

    componentDidMount() {
        console.log()
     }

    render() {
        return (
          <div className="App">
              <TopNav
                  handleLogout={this.handleLogout.bind(this)}
                  username={this.props.user.username}
              />
              <div className='app-body'>
                  <MainBody />
              </div>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // activeCategory: state.activeCategory,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchCategoriesData: (username) => dispatch(actionCreator.setUsername(username)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuth(App));