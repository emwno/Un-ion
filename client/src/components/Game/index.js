import React, { Component } from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currID: -1,
      time: 60,
      timePlayed: 0,
      score: 0,
      questionIDs: [],
      questionObjectIDs: [],
      articles: {}
    };

    this.generateRand = this.generateRand.bind(this);
    this.onAnswer = this.onAnswer.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/game")
      .then(response => {
        this.setState({
          articles: response.data
        });
        console.log("HELLO");
        console.log(this.state.articles);
        console.log(this.state.articles[0].title);

        // first ID
        this.generateRand();
      })
      .catch(function(error) {
        console.log(error);
      });

    this.interval = setInterval(
      () =>
        this.setState({
          time: this.state.time - 1,
          timePlayed: this.state.timePlayed + 1
        }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //   generate random number and update values
  generateRand() {
    let rand = Math.floor(Math.random() * 100);
    var newArray = this.state.questionIDs.slice();
    var newQuestionObjectIDs = this.state.questionObjectIDs.slice();

    while (newArray.indexOf(rand) !== -1) {
      rand = Math.floor(Math.random() * 100);
    }

    newArray.push(rand);
    newQuestionObjectIDs.push(this.state.articles[rand].objectId);

    this.setState({
      currID: rand,
      questionIDs: newArray,
      questionObjectIDs: newQuestionObjectIDs
    });
  }

  onAnswer(event) {
    event.preventDefault();

    let fakeStatus = this.state.articles[this.state.currID].fakeNews;
    if (
      (fakeStatus && event.target.name === "fake") ||
      (!fakeStatus && event.target.name === "real")
    ) {
      console.log("Correct!");
      this.setState({
        score: this.state.score + 1,
        time: this.state.time + 5
      });
    } else {
      console.log("Wrong");
      this.setState({
        time: this.state.time - 10
      });
    }
    this.generateRand();
  }

  getTime() {
    if (this.state.time >= 0) return this.state.time;
    else {
      clearInterval(this.interval);
      axios
        .post("http://localhost:5000/game/save", {
          score: this.state.score,
          timePlayed: this.state.timePlayed,
          articles: this.state.questionObjectIDs
        })
        .then(response => {
          console.log(response);
          this.props.history.push("/");
        })
        .catch(error => {
          console.log(error);
          this.props.history.push("/");
        });
    }
  }

  render() {
    return (
      <div className="game">
        <h1>{this.getTime()}</h1>
        <div className="thumbnail">
          {this.state.articles.length > 0 && this.state.currID > -1 && (
            <img
              src={this.state.articles[this.state.currID].thumbnail}
              alt="Article thumbnail"
              width="320px"
            />
          )}
        </div>
        <div className="titleQuestion">
          <h2>
            {this.state.articles.length > 0 &&
              this.state.currID > -1 &&
              this.state.articles[this.state.currID].title}
          </h2>
          <h2>Is this fake news?</h2>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="yesButton"
            name="fake"
            onClick={this.onAnswer}
          >
            Yes
          </button>
          <button
            type="button"
            className="noButton"
            name="real"
            onClick={this.onAnswer}
          >
            No
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
