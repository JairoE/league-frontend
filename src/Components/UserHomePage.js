import React from 'react'
// import { Sidebar } from 'semantic-ui-react';
import VsDuoForm from './VsDuoForm.js'
import SoloStats from './SoloStats.js'

export default class UserHomePage extends React.Component {
  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.summonerInfo.id}/stats`)
      .then(res => res.json())
      .then(json => {

        })
      }


  render() {
    return (
      <div>
        <VsDuoForm activeItem={this.props.activeItem}
                  otherUser={this.props.otherUser}
                  vsUser={this.props.vsUser}
                  duoUser={this.props.duoUser}
                  summonerName={this.props.summonerInfo.summonerName}/>
        <SoloStats />

      </div>
    )
  }
}
