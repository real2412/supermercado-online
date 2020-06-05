import React, {Component} from 'react'
import { ContadorProducto } from '../components/ContadorProducto'
import { MercadoPrecio } from '../components/MercadoPrecio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {addToCarrito} from '../actions/carritoActions'

class Producto extends Component {
  constructor(props){
    super(props)
    this.state = {
      id_selected: this.props.mercados.sort((a,b)=>{ return a.precio-b.precio })[0].id,
      contador: 1
    }
  }


  _handleSeleccion = (id_selected) => {
    console.log("pero q pasa aca")
    this.setState({
      id_selected
    })
  }

  _handleContador = (count) => {
    const contador= count<1 ? 1 : count
    this.setState({contador})
  } 

  render () {
    const {nom, imagen, mercados} = this.props
    const {id_selected, contador} = this.state
    return (
      <div className="card">
        <img src={imagen} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{nom}</h5>
          {
            mercados.sort((a,b)=>{ return a.precio-b.precio }).map((x,i)=>{
              let selected = (id_selected === x.id)? true : false
              if(id_selected === 0 && i===0){
                selected = true
                this.setState({id_selected: x.id})
              }
              return (
                    <MercadoPrecio
                      id = {x.id}
                      key = {x.id}
                      nom = {x.nom}
                      mercado_imagen = {x.mercado_imagen}
                      mercado_nom = {x.mercado_nom}
                      precio = {x.precio}
                      selected = {selected}
                      onSeleccion = {this._handleSeleccion}
                    />
                )
            })
          }
          <div className="d-flex mt-2">
            <ContadorProducto onContador={this._handleContador} contador={contador}/>
            <button 
              className="btn btn-primary d-flex" 
              onClick={(e)=>this.props.addToCarrito(this.props.carritoItems==undefined ? []: this.props.carritoItems, id_selected, contador)} 
              >
              Agregar <FontAwesomeIcon className="mt-1 ml-2" icon={faShoppingCart} />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  carritoItems: state.carrito.items
})

export default connect(mapStateToProps, {addToCarrito})(Producto)
