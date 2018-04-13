import React from 'react'
// import { Sidebar } from 'semantic-ui-react';
import VsDuoForm from './VsDuoForm.js'

export default class UserHomePage extends React.Component {

  render() {
    return (
      <div>
        <VsDuoForm vsUser={this.props.vsUser} duoUser={this.props.duoUser} />
      </div>
    )
  }
}
