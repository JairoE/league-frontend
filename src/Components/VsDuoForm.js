import React from 'react'
import {Input, Menu} from 'semantic-ui-react'


class VsDuoForm extends React.Component{
  state={
    otherUser: ""
  }

  inputChange = (event) => {
    this.setState({
      otherUser: event.target.value
    })
  }

  render(){
    return(
      <div>
        <Menu attached='top' tabular>
          <Menu.Item>
            {this.props.summonerName}
          </Menu.Item>
          <Menu.Menu position='right' >
            <Menu.Item>
              <Input transparent  placeholder="Summoner Name" type="text" onChange={this.inputChange}/>
            </Menu.Item>
            <Menu.Item name='VS' active={this.props.activeItem === 'vs'} onClick={()=>{this.props.vsUser(this.state.otherUser)}} />
            <Menu.Item name='Duo' active={this.props.activeItem === 'duo'} onClick={()=>{this.props.duoUser(this.state.otherUser)}} />
          </Menu.Menu>
        </Menu>
      </div>

    )
  }
}

export default VsDuoForm;
