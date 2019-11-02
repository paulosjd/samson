import React, { Component } from 'react';
import AuthService from './utils/auth_service';
import withAuth from './components/auth/with_auth';
import TopNav from './containers/top_nav';
import MainBody from './containers/main_body';

const Auth = new AuthService();

class App extends Component {

    handleLogout(action, actionCreator){
        Auth.logout();
        if (action === 'register') actionCreator();
        this.props.history.replace('/login');
    }

    render() {
        return (
          <div className="App">
              <TopNav
                  handleLogout={this.handleLogout.bind(this)}
              />
              <MainBody
                  handleLogout={this.handleLogout.bind(this)}
              />
          </div>
        );
    }
}

export default withAuth(App);