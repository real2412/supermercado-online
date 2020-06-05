import React, {Component} from 'react'
import {Col, Row} from 'reactstrap'
import {API_URL, API_URL_MERCADOS, API_URL_SEARCH} from '../constants/index'
import {ListaMercado} from '../components/ListaMercado'
import {connect} from 'react-redux'

class BusquedaProducto extends Component {
  constructor () {
    super()
    this.state = {
      inputQuery: '',
      submit: false,
      productos: [],
      mercados: [],
      mer_sel: []
    }
  }

  componentDidMount() {
    fetch(API_URL_MERCADOS)
        .then(rsp=>rsp.json())
        .then(results=>{
            this.setState({
              mercados: results,
              mer_sel: results.map(x=>x.id)
            })
        })
  }

  _handleChange = (e) => {
    this.setState({
                    inputQuery: e.target.value
                  })
  }

  _handleSubmit = (e) => {    
    e.preventDefault()
    let query = "?query="+this.state.inputQuery
    this.state.mer_sel.forEach((x)=>{
      query+="&donde="+x
    })
    this.props.onResults(query)
  }

  _onSeleccion = (id) => {
    const indice_search = Number(id)
    const indice = this.state.mer_sel.indexOf(indice_search)
    if(indice>=0){
      this.state.mer_sel.splice(indice, 1)
    }else{
      this.state.mer_sel.push(indice_search)
    }
  }

  render () {
    const {loading}= this.props
    return (
      <div>
        <ListaMercado mercados={this.state.mercados} onSeleccion={this._onSeleccion} />
        <form onSubmit={this._handleSubmit}>
          <Row className="form-row align-items-center">
            <div className="input-group mb-3">
              <input type="text" 
                onChange={this._handleChange}
                      className="form-control mb-2" id="inlineFormInput" 
                      placeholder="Ingrese articulo a buscar. Por ejemplo: arroz, azucar, pan, etc."/>
              <div className="input-group-append">
                <button className="btn btn-primary mb-2" 
                  disabled={!loading}>
                  Buscar
                </button>
              </div>
            </div>
          </Row>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.productos.loading  
})

export default connect(mapStateToProps)(BusquedaProducto)