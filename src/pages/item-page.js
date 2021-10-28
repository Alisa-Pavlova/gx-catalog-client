import { Button, Container, Table } from 'react-bootstrap'
import { selectedCatalogs, fetchCatalogs } from '../store/reducers/catalogs'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'


function ItemPage() {
  const { id } = useParams()

  const catalogs = useSelector(selectedCatalogs)
  const dispatch = useDispatch()



  useEffect(() => {
    if (!catalogs.length) {
      dispatch(fetchCatalogs())
    }
  }, [])


  return (
    <Container>
      <h1>Items</h1>
      <Button variant="primary">Create Item</Button>

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
            <td><Button variant="warning">Update</Button></td>
            <td><Button variant="danger">Delete</Button></td>
          </tr>)}
        </tbody>
    </Table>}
    
    </Container>
  );
}

export default ItemPage;
