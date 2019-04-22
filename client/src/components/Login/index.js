import React, { Component } from "react";
import axios from 'axios';
import "./styles.css"

class Login extends Component {

    constructor() {
        super();
        this.onLogin = this.onLogin.bind(this);
    }
      
    onLogin(event) {
        console.log('React onLogin');
        event.preventDefault();

        axios.post('http://localhost:5000/login', {
            "username": event.target.username.value,
            "password": event.target.password.value
        })
        .then(function (response) {
            console.log('React' + response);
        })
        .catch(function (error) {
            console.log('React' + error);
        });
    }

    render() {
        return (
            <div id="login-main">
                <form method="post" onSubmit={this.onLogin}>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
