import React, {Component} from 'react'

export class ContadorProducto extends Component {
  render () {
    const {contador} = this.props
    return (<div className="cantidad-box">
        <div className=" cantidad-contador cant-menos text-primary pt-1" onClick={()=>this.props.onContador(contador-1)}> - </div> 
        <div className=" cantidad pt-1">{contador}</div> 
        <div className=" cant-mas cantidad-contador text-primary pt-1" onClick={()=>this.props.onContador(contador+1)}> + </div>
      </div>)
  }
} 
