import React, { Component } from "react";
import "./styles.css";

class GameDetails extends Component {
  render() {
    console.log(this.props.gameList);
    return (
      <div>
        {this.props.gameList.map(function(game, i) {
          return (
            <div className="eachGame" key={i}>
              <div className="box">
              <b>Game {i + 1}</b>
              </div>
              <div className="gameText"><b>Score: {game.score}</b></div>
              <div className="gameText">Time played: {game.timePlayed}</div>
              <div className="gameText">
                Articles:{" "}
                {game.articles.map(function(article, j) {
                  return (
                    <div className="gameText" key={j}>
                      <ul>
                        <li>
                          {article.fakeNews && <b>Real: </b>}
                          {!article.fakeNews && <b>Fake: </b>}
                          <a href={article.link}>{article.title}</a>
                        </li>
                      </ul>
                      
                    </div>
              
                  );
                })}
            {/* <hr></hr> */}

              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default GameDetails;
