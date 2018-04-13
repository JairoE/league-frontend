import React from 'react'
import {Button, Form, Input} from 'semantic-ui-react'


const VsDuoForm = () => {

  const ButtonConditionals = () => (
    <Button.Group>
      <span>
        <span><Button>VS</Button></span>
        <span><Button.Or /></span>
        <span><Button positive>Duo</Button></span>
      </span>
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
