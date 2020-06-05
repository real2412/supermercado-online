import React, {Component} from 'react'
import {Col, Row} from 'reactstrap'
import Producto from '../components/Producto'

export class ListaProducto extends Component {
  constructor (){
    super()
    this.state = {
      prueba: "ayayayyy amoroso"
    }
  }
  _handleAgregarAlCarrito = (producto) => {
    this.props.onAgregarAlCarrito(producto)
  }
  _renderNotFound = () => {
    return <span>No hay Coincidencias</span>
  }
  render () {
    const {results} = this.props
    return (
      <Row>
          {
            results !==undefined ?
                results.map((x)=>{
                  return <Col lg="3" md="4" sm="4" key={x.id}>
                    <Producto 
                      id={x.id}
                      nom={x.nom}
                      precio={x.precio}
                      disponible={x.disponible}
                      imagen={x.imagen}
                      mercado_imagen={x.mercado_imagen}
                      mercados={x.mercados}
                      onAgregarAlCarrito={this._handleAgregarAlCarrito}
                    />
                  </Col>    
                })
            :
            <br/>
          }
      </Row>
    )
  }
}