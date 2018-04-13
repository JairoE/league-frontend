import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react';

export default class SignInForm extends React.Component {
  state=({
    summonerName: null
  })

  inputChange = (event) => {
    this.setState({
      summonerName: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={(event)=>{
          event.preventDefault();
          this.props.createUser(this.state.summonerName)
        }}>
        <Form.Field>
          <Input placeholder="Summoner Name" type="text" onChange={this.inputChange} />
        </Form.Field>
        <Form.Field>
          <Button type="submit">Submit</Button>
        </Form.Field>
        </Form>
      </div>
    )
  }
}
