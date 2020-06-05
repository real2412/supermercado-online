import {FETCH_PRODUCTOS, FETCH_PRODUCTOS_LOADING, FETCH_PRODUCTOS_ERROR, SORT_PRODUCTOS} from '../actions/types'

const initialState = { item: [], sort: '', filteredItems: [], loading: true, error:''}

export default function(state=initialState, action){
  switch(action.type){
    case FETCH_PRODUCTOS:
      return {...state, items: action.payload, filteredItems: action.payload, loading: true, error: ''}
    case FETCH_PRODUCTOS_LOADING:
      return {...state, loading: false}
    case FETCH_PRODUCTOS_ERROR:
      return {...state, loading: true, error: action.error}
    case SORT_PRODUCTOS:
      return {...state, filteredItems: action.payload.items, sort: action.payload.sort}
    default:
      return state
  }
}