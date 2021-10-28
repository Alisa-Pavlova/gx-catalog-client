import { FormControl, Form } from 'react-bootstrap'
import React from 'react'

function ItemForm ({ formRef, handleChangeName, isValidName, item }) {
  return (
    <Form ref={formRef}>
      <Form.Group name="name" controlId="name">
        <Form.Label>Name</Form.Label>
        <FormControl defaultValue={item?.name} isValid={isValidName} onChange={handleChangeName} />
      </Form.Group>
      <br/>
      <Form.Group name="description" controlId="description">
        <Form.Label>Description</Form.Label>
        <FormControl defaultValue={item?.description} as="textarea" />
      </Form.Group>
      <br/>
      <Form.Group name="price" controlId="price">
        <Form.Label>Price</Form.Label>
        <FormControl defaultValue={item?.price} type="number" />
      </Form.Group>
      <br/>
      <Form.Group name="model" controlId="model">
        <Form.Label>Model</Form.Label>
        <FormControl defaultValue={item?.model} />
      </Form.Group>
      <br/>
      <Form.Group name="brand" controlId="brand">
        <Form.Label>Brand</Form.Label>
        <FormControl defaultValue={item?.brand} />
      </Form.Group>
      <br/>
  </Form>
  )
}

export default ItemForm
