import { Button, Container, Table, Alert } from 'react-bootstrap'
import { selectedCatalogs, fetchCatalogs, deleteCatalog } from '../store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function Home () {
  const [error, setError] = useState('')
  const catalogs = useSelector(selectedCatalogs)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!catalogs.length) {
      dispatch(fetchCatalogs())
    }
  }, [])

  const handleDelete = async (id) => {
    dispatch(deleteCatalog(id))
  }

  const handleUpdate = async (id) => {
    history.push(`/catalog/${id}/update`)
  }

  return (
    <Container>
      <Alert
        style={{ position: 'fixed', width: '500px' }}
        variant={'danger'}
        show={error}
        onClose={() => setError('')}
        dismissible
        > {error} </Alert>
      <a href="/catalog/create"><Button variant="primary">Create catalog</Button></a>

      <br/><br/>

      {!catalogs.length && <>There is no catalogs, create one!</>}

      {!!catalogs.length && <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Items Count</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {catalogs.map(catalog => <tr key={catalog.id}>
            <td><a href={`/catalog/${catalog.id}`}>{catalog.name}</a></td>
            <td>{catalog.itemsCount}</td> 
            <td>{catalog.description}</td>
            <td><Button variant="warning" onClick={() => handleUpdate(catalog.id)}>Update</Button></td>
            <td><Button variant="danger" onClick={() => handleDelete(catalog.id)}>Delete</Button></td>
          </tr>)}
        </tbody>
    </Table>}
    
    </Container>
  )
}

export default Home
