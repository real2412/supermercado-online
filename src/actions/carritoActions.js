import {ADD_TO_CARRITO, REMOVE_FROM_CARRITO} from './types'
import {API_URL_RUD} from '../constants/index'

export const addToCarrito = (items, producto_id, cantidad) => (dispatch) => {
  console.log("add carrito")
  const carritoItems = items.slice()
  fetch(API_URL_RUD+producto_id+"/")
      .then(rsp=>rsp.json())
      .then(producto=>{ 
        let productoExistente = false
        carritoItems.forEach((x)=>{
          if(x.id === producto.id){
            productoExistente = true
            x.count+=cantidad
          }
        })
        if(!productoExistente){
          carritoItems.push({...producto, count:cantidad})
        }
        localStorage.setItem("carritoItems", JSON.stringify(carritoItems))
        return dispatch({
          type: ADD_TO_CARRITO,
          payload: {
            carritoItems: carritoItems
          }
        })
      })

}

export const removeFromCarrito = (items, producto) => (dispatch) => {
  const carritoItems = items.slice().filter((x)=> x.id !== producto.id)
  localStorage.setItem("carritoItems", JSON.stringify(carritoItems))
  return dispatch({
    type: REMOVE_FROM_CARRITO,
    payload: {
      carritoItems: carritoItems
    }
  })

}
