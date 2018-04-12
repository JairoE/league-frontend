import React from 'react'
import { Form, Input } from 'semantic-ui-react';

export default class SignInForm extends React.Component {

  render() {
    return (
      <div>
        <Form onSubmit={this.props.createUser}>
          <Input placeholder="Summoner Name" type="text" />
          <Input type="submit" />
        </Form>
      </div>
    )
  }
}
