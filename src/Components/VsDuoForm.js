import React from 'react'
import {Button, Form, Input} from 'semantic-ui-react'


const VsDuoForm = () => {

  const ButtonConditionals = () => (
    <Button.Group>
      <Button>VS</Button>
      <Button.Or />
      <Button positive>Duo</Button>
    </Button.Group>
  )

  return(
    <div>
      <Form>
        <Input placeholder="Summoner Name" type="text" />
        {ButtonConditionals()}
      </Form>
    </div>
  )
}

export default VsDuoForm;
