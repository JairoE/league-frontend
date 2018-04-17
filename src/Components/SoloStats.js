import React from 'react'
import ShowStats from './ShowStats'
import LoadingPage from './LoadingPage'
import { Card } from 'semantic-ui-react'



class SoloStats extends React.Component{
  state = {
    stats: [],
    retrievedRank: 0

  }

  componentDidMount(){
    let statsArray = []
    this.fetchMatchInfo(statsArray, -1)
    // console.log(this.props
    // debugger
  }

  fetchMatchInfo = (array) => {
    if(array.length < 15){
      let matchId = this.props.matches[array.length].id
      fetch(`http://localhost:3000/matches/${matchId}`)
      .then(res => res.json())
      .then(json => {
        array.push(json)
        this.setState({
          stats: array,
          retrievedRank: ++this.state.retrievedRank
        }, () => {
          this.fetchMatchInfo(array)
          if (this.state.retrievedRank === 1) {
            const participantId = this.state.stats[0].participantIdentities.filter (p => {
              return p.player.summonerName === this.props.summonerInfo.summonerName
            })[0].participantId
            const participantRank = this.state.stats[0].participants[participantId-1].highestAchievedSeasonTier
            this.props.getRank(participantRank)

          }


        })
      })
    }
  }

  showStats = () => {
    let returnedArray = []
    let counter = 0
    while (counter < this.state.stats.length) {
      returnedArray.push(
        <ShowStats
          stats={this.state.stats[counter]}
          summonerInfo = {this.props.summonerInfo}
          key={counter}
        />)
      counter++
    }
    return returnedArray
  }

  render(){
    return(
      <div>
        {
          this.state.stats.length === 15 ?
          <Card.Group itemsPerRow={3}>
            {this.showStats()}
          </Card.Group>
          :
            <LoadingPage />
        }
      </div>
    )
  }
}

export default SoloStats
