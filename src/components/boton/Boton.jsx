import React from 'react'
import './Boton.css'
const Boton = (props) => {
  return (
    <button className={props.estilo}>{props.texto}</button>
  )
}

export default Boton