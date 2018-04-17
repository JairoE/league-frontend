import React from 'react'
import ShowStats from './ShowStats'
import LoadingPage from './LoadingPage'
import { Card } from 'semantic-ui-react'



class SoloStats extends React.Component{
  state = {
    stats: []
  }

  componentDidMount(){
    let statsArray = []
    this.fetchMatchInfo(statsArray, -1)
  }

  fetchMatchInfo = (array, num) => {
    if(num > (-16)){
      let matchId = this.props.matches.slice(num)[0].id
      fetch(`http://localhost:3000/matches/${matchId}`)
      .then(res => res.json())
      .then(json => {
        array.push(json)
        this.setState({
          stats: array
        }, () => this.fetchMatchInfo(array, num-1) )
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
          // (<Segment attached="bottom">
            <LoadingPage />
          // </Segment>)
        }
      </div>
    )
  }
}

export default SoloStats
