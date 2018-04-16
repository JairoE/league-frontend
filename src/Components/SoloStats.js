import React from 'react'

class SoloStats extends React.Component{
  state = {
    stats: []
  }

  componentDidMount(){
    let matches = this.props.matches
    let statsArray = []
    this.fetchMatchInfo(statsArray)
    // for(let i=0; i < 10; i++){
    //   let matchId = matches[i].id
    //   fetch(`http://localhost:3000/matches/${matchId}`)
    //   .then(res => res.json())
    //   .then(json => {
    //     statsArray.push(json)
    //   })
    // }
    //
    // this.setState({
    //   stats: statsArray
    // })


  }

  fetchMatchInfo = (array) => {
    if(array.length<10){
      console.log(array)
      let matchId = this.props.matches[array.length].id
      fetch(`http://localhost:3000/matches/${matchId}`)
      .then(res => res.json())
      .then(json => {
        array.push(json)
        this.setState({
          stats: array
        }, () => this.fetchMatchInfo(array) )
      })
    }
  }

  render(){
    return(
      <div>
        {this.state.stats.length}
      </div>
    )
  }
}

export default SoloStats
