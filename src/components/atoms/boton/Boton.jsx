import React from 'react'
import './Boton.css'
const Boton = (props) => {
  return (
    <div className={props.estilo}>
      <p>{props.texto}</p>
    </div>
  )
}

export default Boton