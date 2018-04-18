import React from 'react';
import { Card } from 'semantic-ui-react'
import '../App.css'

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
    return (
      <div className="centerStuff">
      <h4 className="centerStuff">Deets</h4>
      <ul>
        <li>Largest crit: {this.userStats.stats.largestCriticalStrike}</li>
        <li>Time CCing others: {this.userStats.stats.timeCCingOthers} seconds</li>
        <li>Total vision wards: {this.userStats.stats.visionWardsBoughtInGame}</li>
        <li>Longest life: {(this.userStats.stats.longestTimeSpentLiving / 60.0).toFixed(2)} mins</li>
        <li>Highest Kill Streak: {this.multiKills()}</li>
      </ul>
      </div>
    )
  }

  multiKills(){
    let x = "No MultiKills"
    if (this.userStats.stats.doubleKills !== 0){
      x = "DoubleKill!"
    }
    if (this.userStats.stats.tripleKills !== 0){
      x = "TripleKill!"
    }
    if (this.userStats.stats.quadraKills !== 0){
      x = "QuadraKill!"
    }
    if (this.userStats.stats.pentaKills !== 0){
      x = "PentaKill!"
    }

    return x
  }

  datePlayed = () =>{
    let date = this.gameStats.gameCreation
    date = new Date(date).toString().slice(0,-18)
    return date
  }
  // console.log(props.stats.participantIdentities)
  render(){
    return(
      <Card id={this.teamStats.win==="Win" ? "winningCard" : "LosingCard"} color="red" onClick={this.clickHandler}>
        <h2 className="centerStuff">{this.datePlayed()}</h2>
        <h3  className="centerStuff" >Game outcome: {this.teamStats.win} </h3>
        <h3 className="centerStuff" > KDA: {this.userStats.stats.kills}/{this.userStats.stats.deaths}/{this.userStats.stats.assists}</h3>
        {this.state.champion !== null ?
          (<div className="imgStuff centerStuff" ><h3 className="centerStuff" > {this.state.champion.name}: {this.state.champion.nickname} </h3>
            <img src={this.state.champion.image_url} alt={this.state.champion.name}/>
          </div>)
          : null}
        <p className="centerStuff" >Game length: {(this.gameStats.gameDuration/60.0).toFixed(2)} mins</p>
        {this.state.clicked ? this.showExtraStats() : null}
      </Card>
    )
  }
}

export default ShowStats
