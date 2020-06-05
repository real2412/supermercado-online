import React, {Component} from 'react'
import {Col, Container, Row} from 'reactstrap'
import BusquedaProducto from '../components/BusquedaProducto'
import {ListaProducto} from '../components/ListaProducto'
import FiltroBusqueda from '../components/FiltroBusqueda'
import {connect} from 'react-redux'
import {fetchProductos} from '../actions/productoActions'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      results: [],
      envio: false
    }
  }

  _handleAgregarAlCarrito = (producto) => {
    this.props.onAgregarAlCarrito(producto)
  }

  _handleResults = (query) => {
    //this.setState({ results })
    this.props.fetchProductos(query)
    this.setState({ envio : true})
    console.log("enviado")
  }

  render () {
    const {loading, resultados, error} = this.props

    return (
      <Container >
        <Row>
          <Col md="6" className="mx-auto">
            <BusquedaProducto onResults={this._handleResults} />
          </Col>
        </Row>
        { !this.state.envio ? 
          <Row>
              <Col md="12">
                <h2></h2>
              </Col>
          </Row> :
          <Row>
            <Col md="12">
              {
                loading?
                  resultados.length>0?
                  <div>
                    <FiltroBusqueda onFiltro={this._handleFiltro}/>
                    <ListaProducto 
                      results={resultados}
                      onAgregarAlCarrito={this._handleAgregarAlCarrito} />
                  </div>
                  :
                  error===''?
                    <h5>No hay resultados</h5>
                    :
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                :
                <Col md="12" className="text-center">   
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </Col>
              }
            </Col>
          </Row>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  resultados: state.productos.filteredItems,
  loading: state.productos.loading, 
  error: state.productos.error 
})

export default connect(mapStateToProps, {fetchProductos})(Home)