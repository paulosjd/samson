import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/auth/login';
import { store } from "./store/store";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
