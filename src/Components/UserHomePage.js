import React from 'react'
// import { Sidebar } from 'semantic-ui-react';
import VsDuoForm from './VsDuoForm.js'
import SoloStats from './SoloStats.js'
import {Input, Menu} from 'semantic-ui-react'

export default class UserHomePage extends React.Component {
  state = {
    userMatches: [],
    summonerRank: null
  }

  componentDidMount(){
    console.log(this.props.summonerInfo)
    fetch(`http://localhost:3000/users/${this.props.summonerInfo.id}/matches`)
      .then(res => res.json())
      .then(json => {
          this.setState({
            userMatches: json
          },()=>console.log(this.state.userMatches))
      })
  }

  getRank = () => {

  }

  render() {
    return (
      <div>
        <Menu attached='top' tabular>
          <Menu.Item>
            {this.props.summonerInfo.summonerName}
          </Menu.Item>
          <Menu.Item>
            {this.state.userMatches.length>0 ? this.getRank() : 'unranked'}
          </Menu.Item>
          <Menu.Menu position='right' >
            <Menu.Item>
              <Input transparent  placeholder="Summoner Name" type="text"/>
            </Menu.Item>
            <Menu.Item name='VS'  />
            <Menu.Item name='Duo' />
          </Menu.Menu>
        </Menu>
         {this.state.userMatches.length > 0 ?
          <SoloStats
            summonerInfo = {this.props.summonerInfo}
            matches={this.state.userMatches} />
          : null}

      </div>
    )
  }
}
