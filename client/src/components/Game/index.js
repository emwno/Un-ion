import React, { Component } from "react";
import axios from "axios";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      questionIDs: [],
      currID: -1
    };

    this.checkCorrect = this.checkCorrect.bind(this);
    this.generateRand = this.generateRand.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/game")
      .then(response => {
        // console.log(response.data);
        // first ID
        this.generateRand();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //   check if the answer selected is correct or not
  checkCorrect() {}

  //   generate random number
  generateRand() {
    const rand = Math.floor(Math.random() * 100);
    var newArray = this.state.questionIDs.slice();
    newArray.push(rand);
    this.setState({
      currID: rand,
      questionIDs: newArray
    });
    console.log(this.state.questionIDs);
  }

  render() {
    return (
      <div className="main">
        <h1>Timer counts down here</h1>
        <div className="thumbnail">
          <img
            src="https://i.imgur.com/iChU2VU.png"
            alt="Article thumbnail"
            width="160px"
          />
        </div>
        <div className="titleQuestion">
          <h2>This is a placeholder for the article title</h2>
          <h2>Fake news?</h2>
        </div>
        <div className="buttons">
          <button type="button" className="yesButton">
            Yes
          </button>
          <button type="button" className="noButton">
            No
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
