import React, { Component } from 'react';
// import { Router, Switch, Link, NavLink } from 'react-router-dom';
import SignUpForm from './Components/SignUp.js';
import SignInForm from './Components/SignIn.js'
import UserHomePage from './Components/UserHomePage.js';
// import './App.css';


class App extends Component {

  state = {
    signedInUser: null,
    vsUser: null,
    duoUser: null
  }

  createUser = (summonerName, email) => {
    summonerName = summonerName.replace(" ", "%20")
    fetch('http://localhost:3000/users/sign_up', {
          method: 'POST',
          headers: {
    		Accepts: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summonerName: summonerName,
            email: email,
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
    summonerName = summonerName.replace(" ", "%20")
    fetch('http://localhost:3000/fetch_user', {
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
            vsUser: json
          })
        })
  }

  duoUser = (summonerName) => {
    summonerName = summonerName.replace(" ", "%20")
    fetch('http://localhost:3000/fetch_user', {
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
            duoUser: json
          })
        })
  }

  signInUser = (summonerName, email) => {
    summonerName = summonerName.replace(" ", "%20")
    fetch('http://localhost:3000/users/sign_in', {
          method: 'POST',
          headers: {
    		Accepts: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summonerName: summonerName,
            email: email,
          })
        })
        .then(res => res.json())
        .then(json => {
          this.setState({
            signedInUser: json
          })
        })
  }

  render() {
    return (
      <div>
        {!this.state.signedInUser ?
          (<div>
            <SignUpForm createUser={this.createUser} />
            <SignInForm signInUser={this.signInUser} />
          </div>):
          <UserHomePage summonerInfo={this.state.signedInUser} createUser={this.createUser} vsUser={this.vsUser} duoUser={this.duoUser} />
        }
      </div>
    );
  }
}

export default App;
