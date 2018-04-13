import React, { Component } from 'react';
// import { Router, Switch, Link, NavLink } from 'react-router-dom';
import SignInForm from './Components/SignIn.js';
import UserHomePage from './Components/UserHomePage.js';
// import './App.css';


class App extends Component {

  state = {
    signedInUser: null,
    vsUser: null,
    duoUser: null
  }

  createUser = (summonerName) => {
    summonerName = summonerName.replace(" ", "%20")
    fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
    		Accepts: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summonerName: summonerName,
          })
        })
        .then(res => res.json())
        .then(json => {
          this.setState({
            signedInUser: json
          })
        })
  }

  vsUser = (summonerName) => {

  }

  duoUser = (summonerName) => {
    
  }
  render() {
    console.log(this.state)
    return (
      <div>
        {!this.state.signedInUser ?
          <SignInForm createUser={this.createUser} /> :
          <UserHomePage summonerInfo={this.state.signedInUser} createUser={this.createUser} />
        }
      </div>
    );
  }
}

export default App;
