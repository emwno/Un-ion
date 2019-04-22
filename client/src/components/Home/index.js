import React, { Component } from "react";
import axios from 'axios';
class Home extends Component {
    
    constructor(props) {
        super(props);
        console.log(this);
        this.state = {
            titles: ""
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/login/check').then(function (response) {
            console.log("logged in");
        })
        .catch(error => {
            console.log('Redirect to /login');
            this.props.history.push("/login");
            return;
        });

        axios.get('http://localhost:5000/').then(response => {
            console.log(response);
            this.setState({
                titles: response.data[0].title
            });
        }).catch(function (error){
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>{JSON.stringify(this.state.titles)}</p>
            </div>
        );
    }
}

export default Home;
