import { Button, Container, FormControl, Form, Alert } from 'react-bootstrap'
import React, { createRef, useState } from 'react'
import debounce from '../utils/debounce'
import api from '../utils/api'
import { useHistory, useParams } from 'react-router-dom'

function CreateItemPage() {
  const { id } = useParams()

  const [error, setError] = useState('')
  const [isValidName, setIsValidName] = useState(false)
  const formRef = createRef()
  const history = useHistory()

  const checkName = async () => {
    const name = formRef.current?.name.value

    if (!name?.trim()) {
      return
    }

    try {
      const { data } = await api.get(`/api/v1/item/name/${name.trim()}`)
      
      if (!!data) {
        throw new Error(`Item ${name} is already exist`)
      }

      setIsValidName(true)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const onSubmit = async () => {
    const name = formRef.current.name.value
    const brand = formRef.current.brand.value
    const price = Number(formRef.current.price.value) || 0
    const model = formRef.current.model.value
    const description = formRef.current.description.value


    if (!isValidName || !name.trim() ) {
      setError('Name is not valid')
      return
    }

    const params = {
      name,
      brand,
      model,
      price,
      description,
      catalog_id: id
    }

    try {
      await api.post('/api/v1/item', params)
      history.push(`/catalog/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  const debounceName = debounce(checkName, 3000)

  const handleChangeName = () => {
    setIsValidName(false)
    debounceName()
  }

  return (
    <Container>
      <Alert
        style={{ position: 'fixed', width: '500px' }}
        variant={'danger'}
        show={error}
        > {error} </Alert>

      <h1>Create item</h1>

      <br/><br/>

      <Form ref={formRef}>
        <Form.Group name="name" controlId="name">
          <Form.Label>Name</Form.Label>
          <FormControl isValid={isValidName} onChange={handleChangeName} />
        </Form.Group>
        <br/>
        <Form.Group name="description" controlId="description">
          <Form.Label>Description</Form.Label>
          <FormControl as="textarea" />
        </Form.Group>
        <br/>
        <Form.Group name="price" controlId="price">
          <Form.Label>Price</Form.Label>
          <FormControl type="number" />
        </Form.Group>
        <br/>
        <Form.Group name="model" controlId="model">
          <Form.Label>Model</Form.Label>
          <FormControl />
        </Form.Group>
        <br/>
        <Form.Group name="brand" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <FormControl />
        </Form.Group>
        <br/>
        
      </Form>
        <a href={`/catalog/${id}`}><Button variant="warning">Cancel</Button></a>
        {' '}
        <Button disabled={error || !isValidName} onClick={onSubmit}>Create</Button> 
    
    </Container>
  );
}

export default CreateItemPage
