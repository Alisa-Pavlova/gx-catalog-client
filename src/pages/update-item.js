import { Button, Container, Alert } from 'react-bootstrap'
import React, { createRef, useState, useEffect } from 'react'
import debounce from '../utils/debounce'
import api from '../utils/api'
import { useHistory, useParams } from 'react-router-dom'
import ItemForm from '../components/item-form'
import { selectedCatalog, fetchCatalog, updateValue } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'


function UpdateItemPage () {
  const { catalogId, id } = useParams()
  const [error, setError] = useState('')
  const [isValidName, setIsValidName] = useState(true)
  const formRef = createRef()
  const history = useHistory()
  const dispatch = useDispatch()

  const catalog = useSelector(selectedCatalog)
  const items = catalog.items || []
  const item = items.find(i => i.id === Number(id))
  console.log(items);

  useEffect(() => {
    if (!catalog.name) {
      dispatch(fetchCatalog(catalogId))
    }
  }, [])

  const checkName = async () => {
    const name = formRef.current?.name.value

    if (!name?.trim()) {
      return
    }

    if (item?.name === name) {
      setIsValidName(true)
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
      catalog_id: catalogId
    }

    try {
      const { data } = await api.put(`/api/v1/item/${id}`, params)
      dispatch(updateValue(data, 'items'))
      history.push(`/catalog/${catalogId}`)
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

        <ItemForm formRef={formRef} handleChangeName={handleChangeName} isValidName={isValidName} item={item} />
        <a href={`/catalog/${catalogId}`}><Button variant="warning">Cancel</Button></a>
        {' '}
        <Button disabled={error || !isValidName} onClick={onSubmit}>Update</Button> 
    
    </Container>
  );
}

export default UpdateItemPage
