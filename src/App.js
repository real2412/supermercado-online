import React, {Component, Fragment}from 'react';
import Header from './components/Header'
import Home from './pages/Home'
import { API_URL_RUD } from './constants/index'
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {
  constructor () {
    super()
    this.state = {
      carritoItems: []
    }
  }
  _handleAgregarAlCarrito = (id_selected) => {
    fetch(API_URL_RUD+id_selected+"/")
          .then(rsp=>rsp.json())
          .then(results=>{ 
            console.log(results)
            this.setState((state)=>{
              const carritoItems = state.carritoItems
              carritoItems.push(results)
              return { carritoItems } 
            })
          })
    //this.setState({
      //nuevoProducto: id_selected 
    //})
  }
  render () {
    return (
      <Provider store={store}>
        <Fragment>
          <Header carritoItems={this.state.carritoItems}/>
          <Home 
            onAgregarAlCarrito={this._handleAgregarAlCarrito} 
          />
        </Fragment>
      </Provider>
    )
  }
}

export default App;
