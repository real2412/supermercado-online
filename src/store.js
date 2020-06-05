import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

if(localStorage.getItem('carritoItems')){
  initialState.carrito = {items: JSON.parse(localStorage.getItem("carritoItems"))}
}

export default createStore(rootReducer, initialState, applyMiddleware(thunk))