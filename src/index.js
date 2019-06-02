import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from "./store/reducers/root";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import Login from './components/auth/login';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

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
