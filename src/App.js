import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import SignUpForm from './Components/SignUp.js';
import SignInForm from './Components/SignIn.js'
import UserHomePage from './Components/UserHomePage.js';
import {Container, Grid} from 'semantic-ui-react';
import './App.css';


class App extends Component {
  constructor(props) {
    super()
    this.state = {
      signedInUser: null,
      // otherUser: null,
      // activeTab: null
    }
  }

  componentWillUpdate = () => {
    if (this.state.signedInUser !== null){
      this.redirectUser()
    }
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

  // vsUser = (summonerName) => {
  //   summonerName = summonerName.replace(" ", "%20")
  //   fetch('http://localhost:3000/fetch_user', {
  //         method: 'POST',
  //         headers: {
  //   		Accepts: 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           summonerName: summonerName,
  //         })
  //       })
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({
  //           otherUser: json,
  //           activeTab: 'vs'
  //         })
  //       })
  // }
  //
  // duoUser = (summonerName) => {
  //   summonerName = summonerName.replace(" ", "%20")
  //   fetch('http://localhost:3000/fetch_user', {
  //         method: 'POST',
  //         headers: {
  //   		Accepts: 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           summonerName: summonerName,
  //         })
  //       })
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({
  //           otherUser: json,
  //           activeTab: 'duo'
  //         })
  //       })
  // }

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

  redirectUser = () => {
    if (this.props.location.pathname != '/home') {
      this.props.history.push('/home');
    }
  }

  render() {
    const { location, history } = this.props
    return (
          <div>
            <Switch>
              <Route exact path="/" render={ this.signInOrUpPath } />
              <Route exact path="/home" render={ this.userHomePagePath } />
            </Switch>
          </div>
    );
  }
}

export default withRouter(App);
