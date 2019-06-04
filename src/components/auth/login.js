import React, { Component } from 'react';
import AuthService from '../../utils/auth_service';
import './login.css';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {invalid: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username"
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                    { this.state.invalid ? <h5 style={{color: 'red'}}>
                        Login credentials failed</h5> : null }
                </div>
            </div>
        );
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.username,this.state.password)
            .then(() => {
                this.props.history.replace('/');
            })
            .catch(() => {this.setState({invalid: true})})
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
}

export default Login;