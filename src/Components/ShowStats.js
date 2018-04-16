import React from 'react';

const ShowStats = (props) => {

  const summonerName = props.summonerInfo.summonerName
  const gameStats = props.stats
  const participantId = props.stats.participantIdentities.filter ((participant) => {
    return participant.player.summonerName === summonerName
  })[0].participantId

  const userStats = props.stats.participants.filter ((participant) => {
    return participant.participantId === participantId
  })[0]

  const teamStats = props.stats.teams.filter ((team) => {
    return team.teamId === userStats.teamId
  })[0]

  console.log(teamStats)


  // console.log(props.stats.participantIdentities)

  return(
    <div>
      <h1>Game outcome: {teamStats.win} </h1>
      <p>Game length: {gameStats.gameDuration}</p>
      <p>Time spent ccd: </p>
    </div>
  )

}

export default ShowStats
