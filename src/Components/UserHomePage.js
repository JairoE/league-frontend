import React from 'react'
// import { Sidebar } from 'semantic-ui-react';
import VsDuoForm from './VsDuoForm.js'
import SoloStats from './SoloStats.js'
import {Input, Menu, Segment} from 'semantic-ui-react'

export default class UserHomePage extends React.Component {
  state = {
    userMatches: [],
    summonerStats: 'unranked'
  }

  componentDidMount(){
    // console.log(this.props.summonerInfo)
    fetch(`http://localhost:3000/users/${this.props.summonerInfo.id}/matches`)
      .then(res => res.json())
      .then(json => {
        this.setState({userMatches: json}, () => this.fetchRank())
      })
  }

  fetchRank = () => {
    fetch(`http://localhost:3000/users/${this.props.summonerInfo.id}/fetch_rank`)
      .then(res => res.json())
      .then(json => {
        debugger
        let stats = {tier: "unranked", wins:"N/A", losses: "N/A"}
        if (json.length !== 0){
          stats = json[0]
        }
        this.setState({
          summonerStats: stats
        }, console.log(this.state.summonerStats))
      })
  }

  summonerRank = () => {
    if(this.state.summonerStats === "unranked"){
      return this.state.summonerStats
    }

    let x = this.state.summonerStats.tier
    let firstLetter = x[0]
    let rest = x.slice(1)
    return firstLetter+rest.toLowerCase()
  }

  render() {
    return (
      <div>
        <Segment inverted>
        <Menu inverted pointing secondary attached='top' tabular>
          <Menu.Item>
            {this.props.summonerInfo.summonerName}
          </Menu.Item>
          <Menu.Item>
            Rank: {this.summonerRank()}
          </Menu.Item>
          <Menu.Item>
            Wins: {this.state.summonerStats.wins}/Losses: {this.state.summonerStats.losses}
          </Menu.Item>
          <Menu.Menu position='right' >
            <Menu.Item>
              LEAGUE OF LEGENDS
            </Menu.Item>
            <Menu.Item name='SignOut' onClick={()=>{this.props.LogOut()}}/>
          </Menu.Menu>
        </Menu>
        </Segment>
         {this.state.userMatches.length > 0 ?
          <SoloStats
            summonerInfo = {this.props.summonerInfo}
            matches={this.state.userMatches} />
          : null}

      </div>
    )
  }
}
