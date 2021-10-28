import { Button, Container, FormControl, Form, Alert } from 'react-bootstrap'
import React, { createRef, useState } from 'react'
import debounce from '../utils/debounce'
import api from '../utils/api'
import { useHistory } from 'react-router-dom'

function CreateCatalogPage() {
  const [error, setError] = useState('')
  const [isValidName, setIsValidName] = useState(false)
  const formRef = createRef()
  const history = useHistory();

  const checkName = async () => {
    const name = formRef.current?.name.value

    if (!name?.trim()) {
      return
    }

    try {
      const { data } = await api.get(`/api/v1/catalog/name/${name.trim()}`)
      
      if (!!data) {
        throw new Error(`Catalog ${name} is already exist`)
      }

      setIsValidName(true)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const onSubmit = async () => {
    const name = formRef.current.name.value
    const description = formRef.current.description.value

    if (!isValidName || !name.trim() ) {
      setError('Name is not valid')
      return
    }

    const params = {
      name,
      description
    }

    try {
      await api.post('/api/v1/catalog', params)
      history.push('/')
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

      <h1>Create catalog</h1>
     
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
        
      </Form>
        <a href='/'><Button variant="warning">Cancel</Button></a>
        {' '}
        <Button disabled={error || !isValidName} onClick={onSubmit}>Create</Button> 
    
    </Container>
  );
}

export default CreateCatalogPage;
