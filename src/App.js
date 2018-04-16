import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignUpForm from './Components/SignUp.js';
import SignInForm from './Components/SignIn.js'
import UserHomePage from './Components/UserHomePage.js';
import {Container, Grid} from 'semantic-ui-react'
import './App.css';


class App extends Component {

  state = {
    signedInUser: null,
    otherUser: null,
    activeTab: null
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
            otherUser: json,
            activeTab: 'vs'
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
            otherUser: json,
            activeTab: 'duo'
          })
        })
  }

  signInOrUpPath = () => {
    return (
      <div id="homescreen-bg">
        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={6}>

                <SignUpForm createUser={this.createUser} />
                <SignInForm signInUser={this.signInUser} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }

  userHomePagePath = () => {
    return (
      <UserHomePage summonerInfo={this.state.signedInUser}
                    otherUser={this.state.otherUser}
                    vsUser={this.vsUser}
                    duoUser={this.duoUser}
                    activeTab={this.state.activeTab} />
    )
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
    // console.log(this.state)
    return (
      <Router>
        {!this.state.signedInUser ?
          (
            <Route path="/"
              render={ this.signInOrUpPath }
            />
          ):
          (
            <div>
              <Route path="/history"
                render={ this.userHomePagePath }
              />
              <Redirect to='/history' />
            </div>
          )
        }
      </Router>
    );
  }
}

export default App;
