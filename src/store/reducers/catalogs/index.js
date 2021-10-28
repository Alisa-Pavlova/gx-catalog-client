import { handleActions } from 'redux-actions'

import api from '../../../utils/api'

export const storeKey = '@redux/catalogs'

const SET_CATALOGS = '@catalogs/SET_CATALOGS'
const DELETE_CATALOG = '@catalogs/DELETE_CATALOG'

const initialState = {
  catalogs: [],
}

export const reducer = handleActions(
  {
    [SET_CATALOGS]: (state, { value }) => (
      {
        ...state, catalogs: value,
      }
    ),
    [DELETE_CATALOG]: (state, { value }) => (
      {
        ...state, catalogs: state.catalogs.filter(catalog => catalog.id !== value ),
      }
    ),
  },
  initialState,
)

export const selectedCatalogs = store => store[storeKey].catalogs

export const fetchCatalogs = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/v1/catalog')

    if (data) {
      dispatch({ type: SET_CATALOGS, value: data })
    }
  } catch (err) {
    console.log(err)
  }
}

export const deleteCatalog = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/v1/catalog/${id}`)
    dispatch({ type: DELETE_CATALOG, value: id })
  } catch (err) {
    console.log(err)
  }
}


