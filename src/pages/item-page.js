import { Button, Container, Table, InputGroup, FormControl } from 'react-bootstrap'
import { selectedCatalog, fetchCatalog, selectedItems, fetchItemsBySearch } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import { useHistory } from 'react-router-dom'

function ItemPage() {
  const { id } = useParams()
  const catalog = useSelector(selectedCatalog)
  const items = useSelector(selectedItems)
  const dispatch = useDispatch()
  const [searchString, setSearchString] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (!catalog.name) {
      dispatch(fetchCatalog(id))
    }
  }, [])

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/api/v1/item/${itemId}`)
      dispatch(fetchCatalog(id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearch = async () => {
    dispatch(fetchItemsBySearch(id, searchString.trim()))
  }

  const handleUpdate = (itemId) => {
    history.push(`/catalog/${id}/update/${itemId}`)
  }

  return (
    <Container>
      <a href="/">
        {'< '} To catalogs list
      </a>
      <br/><br/>
      <a href={`/catalog/${id}/create`}>
        <Button variant="primary">Create Item</Button>
      </a>

      <h1>{catalog.name}</h1>

      <br/><br/>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          <Button variant="info" onClick={handleSearch}>Search</Button>
        </InputGroup.Text>
        <FormControl value={searchString} onChange={({ target: { value } }) => setSearchString(value)} />
      </InputGroup>

      {!items.length && <>There is no items, create one!</>}

      {!!items.length && <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {items.map(item => <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.brand}</td>
            <td>{item.model}</td>
            <td>{item.price}</td>
            <td><Button variant="warning" onClick={() => handleUpdate(item.id)}>Update</Button></td>
            <td><Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button></td>
          </tr>)}
        </tbody>
      </Table>}
    </Container>
  )
}

export default ItemPage;
