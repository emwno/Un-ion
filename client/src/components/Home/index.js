import React, { Component } from "react";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      titles: ""
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    axios
      .post("http://localhost:5000/logout", {})
      .then(response => {
        console.log(response.status);
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios.get("http://localhost:5000/login/check").catch(error => {
      console.log("Redirect to /login");
      this.props.history.push("/login");
      return;
    });

    axios
      .get("http://localhost:5000/")
      .then(response => {
        console.log(response);
        this.setState({
          titles: response.data[0].title
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="overall">
        <div className="logout">
          <button onClick={this.logout}>LOGOUT</button>
        </div>
        <div className="home">
          <h1>Welcome!</h1>
        </div>
      </div>
    );
  }
}

export default Home;
