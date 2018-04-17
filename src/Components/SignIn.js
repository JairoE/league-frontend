import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react';

export default class SignUpForm extends React.Component {
  state=({
    summonerName: null,
    email: null,
  })

  summonerNameChange = (event) => {
    this.setState({
      summonerName: event.target.value,
    })
  }

  summonerEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    })
  }

  render() {
    return (
      <div id="sign-up-in">
        <Form onSubmit={(event)=>{
          event.preventDefault();
          this.props.signInUser(this.state.summonerName, this.state.email)
        }}>

          <Input placeholder="Summoner Name" type="text" onChange={this.summonerNameChange} /><br/><br/>
          <Input placeholder="Email" type="text" onChange={this.summonerEmailChange}/><br/><br/>
          <Button type="submit">Sign In</Button>

        </Form>
      </div>
    )
  }
}

// {
//   this.state.signedInUser !== null
//   ? <Redirect to='/history' />
//   : <Redirect to='/' />
// }
