import { handleActions } from 'redux-actions'

import api from '../../utils/api'

export const storeKey = '@redux/catalogs'

const SET_VALUE = '@catalogs/SET_VALUE'
const SET_ITEMS = '@catalogs/SET_ITEMS'
const DELETE_CATALOG = '@catalogs/DELETE_CATALOG'
const UPDATE_VALUE = '@catalogs/UPDATE_VALUE'


const initialState = {
  catalogs: [],
  items: [],
  catalog: {},
}

export const reducer = handleActions(
  {
    [SET_VALUE]: (state, { value, name }) => (
      {
        ...state, [name]: value,
      }
    ),
    [SET_ITEMS]: (state) => (
      {
        ...state, items: state.catalog.items,
      }
    ),
    [DELETE_CATALOG]: (state, { value }) => (
      {
        ...state, catalogs: state.catalogs.filter(catalog => catalog.id !== value ),
      }
    ),
    [UPDATE_VALUE]: (state, { value, name }) => {
      const updatedArr = [...state[name]]
      updatedArr.splice(updatedArr.findIndex(el => el.id === value.id), 1, value)
      return {
        ...state, [name]: updatedArr,
      }
    },
  },
  initialState,
)

export const selectedCatalogs = store => store[storeKey].catalogs
export const selectedCatalog = store => store[storeKey].catalog
export const selectedItems = store => store[storeKey].items

export const fetchCatalogs = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/v1/catalog')

    if (data) {
      dispatch({ type: SET_VALUE, value: data, name: 'catalogs' })
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

export const fetchCatalog = (catalogId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/v1/catalog/${catalogId}`)
    if (data) {
      await dispatch({ type: SET_VALUE, value: data, name: 'catalog' })
      await dispatch({ type: SET_ITEMS })
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchItemsBySearch = (catalogId, searchString) => async (dispatch) => {
  if (!searchString) {
    dispatch({ type: SET_ITEMS })
    return
  }

  try {
    const { data } = await api.get(`/api/v1/item/search?catalogId=${catalogId}&searchString=${searchString}`)
    if (data) {
      dispatch({ type: SET_VALUE, name: 'items', value: data })
    }
  } catch (err) {
    console.log(err)
  }
}

export const updateValue = (data, name) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_VALUE, value: data, name })
  } catch (err) {
    console.log(err)
  }
}