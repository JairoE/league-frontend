import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount(){
    fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
    		Accepts: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summonerName: "ROFLMFAO_LOL"
          })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
        })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
