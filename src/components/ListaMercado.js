import React, {Component} from 'react'

export class ListaMercado extends Component {

  _handleClick = (e) => {
    if(e.target.dataset.selected==="true"){
      e.target.dataset.selected="false"
      e.target.style.backgroundImage = "url("+e.target.dataset.imagen+")"
    }else{
      e.target.dataset.selected="true"
      e.target.style.backgroundImage = "linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url("+e.target.dataset.imagen+")"
    }
    this.props.onSeleccion(e.target.dataset.id)
  }

  _renderMercados = () => {
    return this.props.mercados.map((x,i)=>{

      return (
        <div className="mr-1" 
        key={i} 
        onClick={this._handleClick}
        title={x.nom}
        data-id={x.id}
        data-imagen={x.imagen}
        data-selected={"false"}
        style={{cursor: "pointer", 
                display: "block",
                backgroundImage: "url("+x.imagen+")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "56px auto",
                backgroundPositionY: "50%",
                width: "56px",
                height: "60px"
                 }} >
        </div>
      )

    })
  }

  render () {
    const {mercados} = this.props
    return (
      <div>
        {mercados.length===0?
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>:
          <div className="d-flex">
            {this._renderMercados()}
          </div>
        }
      </div>
    )
  }
}