import { handleActions } from 'redux-actions'

import api from '../../../utils/api'

export const storeKey = '@redux/items'

const SET_ITEMS = '@items/SET_ITEMS'

const initialState = {
  items: [],
}

export const reducer = handleActions(
  {
    [SET_ITEMS]: (state, { value }) => (
      {
        ...state, catalogs: value,
      }
    ),
  },
  initialState,
)

export const selectedItems = store => store[storeKey].items

export const fetchItems = (catalogId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/v1/item?catalogId=${catalogId}`)
    if (data) {
      dispatch({ type: SET_ITEMS, value: data })
    }
  } catch (err) {
    console.log(err)
  }
}

