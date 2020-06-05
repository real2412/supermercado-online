import React, {Component} from 'react'
import util from '../util'

export class MercadoPrecio extends Component {
  render (){
    const { mercado_imagen, mercado_nom, id, precio, selected} = this.props 
    return (
      <div key={id}>
        <p className={"card-text text-right precio-mercado "+(selected? "alert-secondary active" : "")} 
            onClick={()=>this.props.onSeleccion(id)}
            >
          <img src={mercado_imagen} 
          title={mercado_nom} 
          alt={"Logo de "+mercado_nom} />
          <strong className="ml-3">{util.formatoPrecio(precio)}</strong>
        </p>
      </div>
    )
  }
}
