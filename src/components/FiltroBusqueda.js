import React, {Component} from 'react'
import {Col, Row} from 'reactstrap'
import {connect} from 'react-redux'
import {sortProductos} from '../actions/productoActions'

class FiltroBusqueda extends Component {
  render () {
    return (
      <Row>
        <Col sm="8">
        </Col>
        <Col sm="4">
          <div className="input-group mb-3">
            <select className="custom-select"
                    id="inputGroupSelect01" 
                    onChange={(e)=>this.props.sortProductos(this.props.productos, e.target.value)}>
              <option value="">Ordenar por</option>
              <option value="barato">Menor Precio</option>
              <option value="caro">Mayor Precio</option>
            </select>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  productos: state.productos.filteredItems,
  sort: state.productos.sort
})

export default connect(mapStateToProps, {sortProductos})(FiltroBusqueda)
