import React, { Component } from "react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5000/login", {
        username: event.target.username.value,
        password: event.target.password.value
      })
      .then(response => {
        console.log("Login: " + response.statusText);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("Login " + error);
        alert("Login Unsuccessful");
      });
  }

  componentDidMount() {
    axios.get("http://localhost:5000/login/check").then(response => {
      console.log("Logged In: Redirect to /");
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div class="page-login">
        <h1 class="title">Un-ion</h1>
        <div class="ui centered grid container" >
          <div class="nine wide column">
            <div class="ui fluid card">
              <div class="content">
                <form class="ui form" method="POST" onSubmit={this.onLogin}>
                  <div class="field">
                    <label>User</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div class="field">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button class="ui primary labeled icon button" type="submit">
                    <i class="unlock alternate icon" />
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
