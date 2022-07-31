import React from 'react'
import './Boton.css'
const Boton = (props) => {
  return (
    <div className={props.estilo}>
      <p className='textoBoton'>{props.texto}</p>
    </div>
  )
}

export default Boton