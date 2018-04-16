import React from 'react'

class OtherStats extends React.Component {

  state = {
    allMatches: [],
    allMatchesWithUser: []
  }


  componentDidMount = () => {
    console.log(this.props.otherUser.id)
    fetch(`http://localhost:3000/user_matches/${this.props.otherUser.id}`)
      .then(resp => resp.json())
      .then(json => {
        this.getOthersMatches(json)
      })
  }

  getOthersMatches = (listOfMatches) => {
    // console.log(listOfMatches)

    // this.setState({ allMatches:
    //   listOfMatches.map(matchId => {
    //     return "sup"
    //   })
    // })
    listOfMatches.forEach(match => {
      console.log(match)
      // fetch(`http://localhost:3000/matches/${match}`)
      //   .then(resp => resp.json())
      //   .then(json => {
      //     console.log(json)
      //   })
    })

  }

  // getSpecificMatch = (gameId) => {
  //   let matchObject
  //   fetch(`http://localhost:3000/matches/${gameId}`)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     console.log(json)
  //   })
  // }

  render() {
    console.log(this.state)
    return(
      <div>
        <p>Inside other stats</p>
      </div>
    )
  }
}

export default OtherStats
