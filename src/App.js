import React, { Component } from 'react';
// import { Router, Switch, Link, NavLink } from 'react-router-dom';
import SignInForm from './Components/SignIn.js';
import UserHomePage from './Components/UserHomePage.js';
// import './App.css';


class App extends Component {

  state = {
    signedInUser: null,
  }

  createUser = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
    		Accepts: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summonerName: event.target.children[0].value,
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
    console.log(this.state)
    return (
      <div>
        {!this.state.signedInUser ?
          <SignInForm createUser={this.createUser} /> :
          <UserHomePage summonerInfo={this.state.signedInUser} />
        }
      </div>
    );
  }
}

export default App;
