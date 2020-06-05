import { combineReducers } from 'redux'
import productoReducer from './productoReducer'
import carritoReducer from './carritoReducer'

export default combineReducers({
  productos: productoReducer,
  carrito: carritoReducer
})