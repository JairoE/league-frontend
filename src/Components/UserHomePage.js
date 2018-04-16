import React from 'react'
// import { Sidebar } from 'semantic-ui-react';
import VsDuoForm from './VsDuoForm.js'
import SoloStats from './SoloStats.js'

export default class UserHomePage extends React.Component {
  state = {
    userMatches: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.summonerInfo.id}/matches`)
      .then(res => res.json())
      .then(json => {
          this.setState({
            userMatches: json
          })
      })
  }

  render() {
    return (
      <div>
        <VsDuoForm activeTab={this.props.activeTab}
                  otherUser={this.props.otherUser}
                  vsUser={this.props.vsUser}
                  duoUser={this.props.duoUser}
                  summonerName={this.props.summonerInfo.summonerName}/>
        {this.state.userMatches.length > 0 ?
          <SoloStats
            summonerInfo = {this.props.summonerInfo}
            matches={this.state.userMatches} />
          : null}

      </div>
    )
  }
}
