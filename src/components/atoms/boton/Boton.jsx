import React from 'react'
import './Boton.css'
const Boton = (props) => {
  return (
    <div onClick={props.onClick} className={props.estilo}>
      <p className='textoBoton'>{props.texto}</p>
    </div>
  )
}

export default Boton