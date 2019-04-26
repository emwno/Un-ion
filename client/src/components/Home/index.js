import React, { Component } from "react";
import axios from "axios";
import GameDetails from "./GameDetails";
//import 'semantic-ui-css/semantic.min.css'

import "./styles.css"
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.logout = this.logout.bind(this);
    this.game = this.game.bind(this);
  }

  game(){
    this.props.history.push("/game");
  }

	logout() {
		axios
			.post('http://localhost:5000/logout', {})
			.then(response => {
				console.log(response.status);
				this.props.history.push('/login');
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidMount() {
    axios.get('http://localhost:5000/login/check')
    .then(response => {
      this.getUser();
    })
    .catch(error => {
			console.log('Redirect to /login');
			this.props.history.push('/login');
			return;
		});
	}

	componentDidUpdate() {
		if (this.state.redirect) {
			this.getUser();
		}
	}

  getUser() {
    axios
				.get('http://localhost:5000/')
				.then(response => {
					console.log('test');
					console.log(response.data);
					this.setState({
						user: response.data
					});
				})
				.catch(function(error) {
					console.log(error);
				});
  }

  render() {
    return (
      <div>
        <div >
          <button className="logout" onClick={this.logout}>LOGOUT</button>
        </div>
        <div className="welcome">
          <h1 class="title1">Welcome, {this.state.user.name}!</h1>
        </div>

        <div class="playGame">
          <button className="play" onClick={this.game}>Play Game</button>
        <hr></hr>
        </div>

        
        <div className="gameDetails">
          <h3 className="history">Here is your game history: </h3>
          {this.state.user.games !== undefined && (
            <GameDetails
              key={this.state.user.email}
              gameList={this.state.user.games}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
