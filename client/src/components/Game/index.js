import React, { Component } from "react";

class Game extends Component {
    render() {
        return (
            <div className="main">
                <h1>Timer counts down here</h1>
                <div className="thumbnail">
                    <img 
                        src = "https://i.imgur.com/iChU2VU.png"
                        alt = "Article thumbnail"
                        width = "160px"
                    >
                    </img> 
                </div>
                <div className="titleQuestion">
                    <h2>This is a placeholder for the article title</h2>
                    <h2>Fake news?</h2>
                </div>
                <div className="buttons">
                    <button type="button" className="yesButton">Yes</button>
                    <button type="button" className="noButton">No</button>
                </div>
            </div>
        );
    }
}

export default Game;
