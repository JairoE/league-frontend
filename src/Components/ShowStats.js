import React from 'react';
import { Card } from 'semantic-ui-react'




class ShowStats extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      clicked:false,
      champion:null
    }
    this.summonerName = this.props.summonerInfo.summonerName
    this.gameStats = this.props.stats
    this.participantId = this.props.stats.participantIdentities.filter ((participant) => {
      return participant.player.summonerName === this.summonerName
    })[0].participantId

    this.userStats = this.props.stats.participants.filter ((participant) => {
      return participant.participantId === this.participantId
    })[0]

    this.teamStats = this.props.stats.teams.filter ((team) => {
      return team.teamId === this.userStats.teamId
    })[0]
    // console.log(this.teamStats)
  }


  clickHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  componentDidMount(){
    fetch(`http://localhost:3000/champions/${this.userStats.championId}`)
    .then(res=> res.json())
    .then(json=> {
      this.setState({
        champion: json
      })
    })
  }

  showExtraStats = () => {
    console.log(this.userStats)
    return (
      <ul>
        <li>Largest crit: {this.userStats.stats.largestCriticalStrike}</li>
        <li>Time CCing others: {this.userStats.stats.timeCCingOthers}</li>
        <li>Total vision wards: {this.userStats.stats.visionWardsBoughtInGame}</li>
      </ul>
    )
  }

  // console.log(props.stats.participantIdentities)
  render(){
    return(
      <Card color="red" onClick={this.clickHandler}>
        <h1>Game outcome: {this.teamStats.win} </h1>
        <h2>{this.userStats.stats.kills}/{this.userStats.stats.deaths}/{this.userStats.stats.assists}</h2>
        {this.state.champion !== null ?
          (<div><h2> Champion: {this.state.champion.nickname} </h2>
            <img src={this.state.champion.image_url} alt={this.state.champion.name}/>
          </div>)
          : null}
        <p>Game length: {(this.gameStats.gameDuration/60.0).toFixed(2)} mins</p>
        {this.state.clicked ? this.showExtraStats() : null}
      </Card>
    )
  }
}

export default ShowStats
