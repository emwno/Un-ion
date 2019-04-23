import React, { Component } from "react";
import axios from 'axios';

class Game extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/game').then(response => {
            console.log(response.data);
        }).catch(function (error){
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h1>Game</h1>
            </div>
        );
    }
}

export default Game;
