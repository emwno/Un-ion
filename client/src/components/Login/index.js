import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

var serverURL = "https://un-ion-server.herokuapp.com/";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.register = this.register.bind(this);
  }

  register(event){
    //console.log(this.refs.username.value);
    //console.log(this.refs.password.value);
    event.preventDefault();
    var username = this.refs.username.value;
    var password = this.refs.password.value;

    axios
      .post(serverURL + "login/register", {
        username: username,
        password: password
      })
      .then(response => {
        console.log("Login: " + response.statusText);
        alert("Registration Success!");
      })
      .catch(error => {
        console.log("Login " + error);
        alert("Registration Unsuccessful");
      });
  }

  onLogin(event) {
    event.preventDefault();

    axios
      .post(serverURL + "login", {
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
    axios.get(serverURL + "login/check").then(response => {
      console.log("Logged In: Redirect to /");
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Un-ion</h1>
        <div className="loginBox">
          <form className="ui form" method="POST" onSubmit={this.onLogin}>
            <br />
            <div className="username">
              <label className="label">Username</label>
              <input
                className="inputBox"
                type="text"
                name="username"
                placeholder="Username"
                ref="username"
                required
              />
            </div>

            <div className="password">
              <label className="label">Password</label>
              <input
                className="inputBox"
                type="password"
                name="password"
                placeholder="Password"
                ref="password"
                required
              />
            </div>
            <br />
            <button className="loginButton" type="submit">
              <i className="unlock alternate icon" />
              Login
            </button>
            <br />
            <br />
          </form>

          <div>
            <button className="loginButton" onClick={this.register}>
              Register
            </button>
          </div>
          <br></br>
        </div>
      </div>
    );
  }
}

export default Login;
