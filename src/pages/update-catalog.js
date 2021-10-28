import { Button, Container, Form, Alert } from 'react-bootstrap'
import React, { createRef, useState, useEffect } from 'react'
import debounce from '../utils/debounce'
import api from '../utils/api'
import { useHistory, useParams } from 'react-router-dom'
import CatalogForm from '../components/catalog-form'
import { selectedCatalog, fetchCatalog, updateValue } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'


function UpdateCatalogPage () {
  const { id } = useParams()
  const [error, setError] = useState('')
  const [isValidName, setIsValidName] = useState(true)
  const formRef = createRef()
  const history = useHistory()
  const dispatch = useDispatch()

  const catalog = useSelector(selectedCatalog)

  useEffect(() => {
    if (!catalog.name) {
      dispatch(fetchCatalog(id))
    }
  }, [])

  const checkName = async () => {
    const name = formRef.current?.name.value

    if (!name?.trim()) {
      return
    }

    if (catalog?.name === name) {
      setIsValidName(true)
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
      const { data } = await api.put(`/api/v1/catalog/${id}`, params)
      dispatch(updateValue(data, 'catalogs'))

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

        <h1>Update catalog</h1>
      
        <br/><br/>

        <CatalogForm formRef={formRef} handleChangeName={handleChangeName} isValidName={isValidName} catalog={catalog} />
        <a href='/'><Button variant="warning">Cancel</Button></a>
        {' '}
        <Button disabled={error || !isValidName} onClick={onSubmit}>Update</Button> 
    
    </Container>
  );
}

export default UpdateCatalogPage
