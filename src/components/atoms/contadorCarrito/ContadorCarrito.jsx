import React from 'react'
import './ContadorCarrito.css'
const ContadorCarrito = () => {
    return (
        <div className='d-flex align-items-center'>
            <input className='botonesContadorCarrito' type="button" value="-" />
            <input className='cantidadContadorCarrito' type="number" />
            <input className='botonesContadorCarrito' type="button" value="+" />
        </div>
    )
}

export default ContadorCarrito