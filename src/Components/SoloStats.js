import React from 'react'
import ShowStats from './ShowStats'
import LoadingPage from './LoadingPage'
import { Card } from 'semantic-ui-react'



class SoloStats extends React.Component{
  state = {
    stats: [],

  }

  componentDidMount(){
    let statsArray = []
    this.fetchMatchInfo(statsArray)
  }

  fetchMatchInfo = (array) => {
    if(array.length < 20){
      let matchId = this.props.matches[array.length].id
      fetch(`http://localhost:3000/matches/${matchId}`)
      .then(res => res.json())
      .then(json => {
        array.push(json)
        this.setState({
          stats: array,
        }, () => {
          this.fetchMatchInfo(array)
        })
      })
    }
  }

  showStats = () => {
    let returnedArray = []
    let counter = 0
    let stats = this.state.stats.sort((a,b) => {
      return b.gameCreation - a.gameCreation
    })
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
          this.state.stats.length === 20 ?
          <Card.Group itemsPerRow={4} id="cardGroup">
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
