import { FormControl, Form } from 'react-bootstrap'
import React from 'react'

function CatalogForm ({ formRef, handleChangeName, isValidName, catalog }) {
  return (
      <Form ref={formRef}>
        <Form.Group name="name" controlId="name">
          <Form.Label>Name</Form.Label>
          <FormControl defaultValue={catalog?.name} isValid={isValidName} onChange={handleChangeName} />
        </Form.Group>
        <br/>
        <Form.Group name="description" controlId="description">
          <Form.Label>Description</Form.Label>
          <FormControl defaultValue={catalog?.description} as="textarea" />
        </Form.Group>
        <br/>
      </Form>
  )
}

export default CatalogForm
