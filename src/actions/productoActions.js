import {FETCH_PRODUCTOS, FETCH_PRODUCTOS_LOADING, FETCH_PRODUCTOS_ERROR, SORT_PRODUCTOS} from './types'
import {API_URL_SEARCH} from '../constants/index'

export const fetchProductos = (query) => (dispatch) => {
  dispatch({ type: FETCH_PRODUCTOS_LOADING });
  //COMENTARIO DE PRUEBA
  fetch(API_URL_SEARCH+query)
        .then(rsp=>rsp.json())
        .then(
          results=>{
            console.log("braisl")
            const {productos} = results
              const productos_filtrados = []
              const regex = /\d\s[A-Za-z]/gi;
              productos.forEach((x,i,arr)=>{
                let nombre = x.nom
                if(x.nom.match(regex)!=null){
                  nombre = x.nom.replace(regex, x.nom.match(regex)[0].replace(" ",""))
                }
                let indice = productos_filtrados.map(y=>y.nom.toLowerCase()).indexOf(nombre.toLowerCase())
                if(indice<0){
                  productos_filtrados.push({
                    id: x.id,
                    mercado: x.mercado,
                    mercado_nom: x.mercado_nom,
                    mercado_imagen: x.mercado_imagen,
                    nom: nombre,
                    imagen: x.imagen,
                    desc: x.desc,
                    precio: x.precio,
                    disponible: x.disponible,
                    mercados: [{
                                  id: x.id,
                                  mercado: x.mercado,
                                  mercado_nom: x.mercado_nom,
                                  mercado_imagen: x.mercado_imagen,
                                  precio: x.precio
                              }]
                  })
                }else{
                  productos_filtrados[indice].mercados.push({
                    id: x.id,
                    mercado: x.mercado,
                    mercado_nom: x.mercado_nom,
                    mercado_imagen: x.mercado_imagen,
                    precio: x.precio
                  })
                }
              })
              /*this.setState({
                submit: false
              })*/
              /*this.props.onResults(productos_filtrados.sort((a,b)=>{
                return b.mercados.length-a.mercados.length
              }))*/
            return dispatch({ 
              type:FETCH_PRODUCTOS, 
              payload: productos_filtrados
            })
          },
          error => {
            return dispatch({ 
              type: FETCH_PRODUCTOS_ERROR, 
              error: error.message || 'Unexpected Error!' })
          }
        )
  
}

export const sortProductos = (items, sort) => (dispatch) => {
  const productos = items.slice()
  if(sort ==="barato"){
    productos.sort((a,b)=>{return a.precio-b.precio} )
  }else{
    productos.sort((a,b)=>{return b.precio-a.precio} )  
  }

  return dispatch({
    type: SORT_PRODUCTOS,
    payload: {
      sort:sort,
      items: productos
    }
  })
}
