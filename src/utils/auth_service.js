import axios from 'axios'
import decode from 'jwt-decode';

export default class AuthService {
    constructor() {
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        return this.fetch('http://localhost:8000/auth-jwt/', JSON.stringify({username, password}))
        .then(res => {
            this.setToken(res.data.token);
            return Promise.resolve(res.data);
        }).catch(err => {return Promise.reject(err)});
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000;
        }
        catch (err) {
            return false;
        }
    }

    setToken(token) {
        localStorage.setItem('id_token', token)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }

    fetch(url, body) {
        const headers = {'Content-Type': 'application/json'};
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }
        return axios.post(url, body, {headers: headers})
            .then(this._checkStatus)
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        }
        throw new Error(response.statusText)
    }
}