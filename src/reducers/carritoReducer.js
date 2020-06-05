import {ADD_TO_CARRITO, REMOVE_FROM_CARRITO} from '../actions/types'

const initialState = { item: [] }

export default function(state=initialState, action){
  switch(action.type){
    case ADD_TO_CARRITO:
      return {
        items: action.payload.carritoItems
      }
    case REMOVE_FROM_CARRITO:
      return {
        items: action.payload.carritoItems
      }
    default:
      return state
  }
}