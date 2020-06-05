import React , {Component} from 'react'
import {Col, Row} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons'
import { API_URL_RUD } from '../constants/index'
import {connect} from 'react-redux'
import {removeFromCarrito} from '../actions/carritoActions'
import util from '../util'


class Header extends Component {
  constructor (){
    super()
    this.state = {
      monto_total : 0.0,
      productosXcomprar: []
    } 
  }

  _handleToggle = () => {
    let resumen = document.getElementById("resumen_carrito")
    resumen.classList.toggle("d-none")
  }

  render (){
    const {carritoItems} = this.props
    const totalCarrito = carritoItems===undefined ? "0.00": util.formatoPrecio(carritoItems.map(x=>x.precio*x.count).reduce((c,a)=>{ return c+a },0))
    return (
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <a href="/" className="navbar-brand text-warning"><FontAwesomeIcon icon={faStore} className="mr-1" />SUPER</a>
        <form className="form-inline">
          <button 
            className="btn btn-outline-success my-2 my-sm-0" 
            type="button" onClick={this._handleToggle}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          
            <span>
              <small className="text-light ml-2">Mi carrito</small>
              <br/>
              <span className="ml-2">{ totalCarrito }</span>
            </span>
            <div id="resumen_carrito" className="d-none">
            { 
              carritoItems!==undefined ?
                carritoItems.length > 0 ?
                  <Col sm="12">
                    <div className="items">
                      {carritoItems.map((x,i)=>{
                      console.log(x)
                      return (<div key={x.id+i} className="detalle">
                                <Row>
                                  <Col sm="2" >
                                    <img src={x.imagen} height="30px" className="mr-2" />
                                  </Col>
                                  <Col sm="7">
                                    {x.nom}
                                  </Col>

                                  <Col sm="3" >
                                    <div >X{x.count}</div><br/>
                                    <a href="#" className="cursor-pointer" onClick={()=>this.props.removeFromCarrito(this.props.carritoItems, x)}>
                                      quitar
                                    </a>
                                  </Col>
                                </Row>
                            </div>)}
                      )}
                    </div>
                    <Row>
                      <Col sm="12">
                        <h5><span className="text-success">Total:</span> {totalCarrito}</h5>
                        <button className="btn btn-success mt-2 w-100">Realizar Compra</button>
                      </Col>
                    </Row>
                  </Col>:
                  <span>Carrito Vacío</span>          
                : <span>Carrito Vacío</span>
              
            }
            </div>
        </form>
      </nav>
    )
  }
} 

const mapStateToProps = state => ({
  carritoItems: state.carrito.items  
})

export default connect(mapStateToProps, {removeFromCarrito})(Header)