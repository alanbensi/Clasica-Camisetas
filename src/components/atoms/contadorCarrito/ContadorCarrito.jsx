import React from 'react'
import { useState, useEffect } from 'react'
import './ContadorCarrito.css'
const ContadorCarrito = () => {

    const [cantidadCamisetas, setcantidadCamisetas] = useState(contador)
    const [contador, setContador] = useState(1)
    const sumarCamisetasCarrito = ()=> {
        setContador (contador + 1);
    }
    const restarCamisetasCarrito = () => {
        if (contador !== 1){
            setContador (contador - 1);
        }
    }

    useEffect (()=>{
        setcantidadCamisetas (contador)
    },[contador])

    return (
        <div className='d-flex align-items-center'>
            <input className= {contador !== 1 ? 'botonesContadorCarrito' : 'botonesContadorCarrito disabled' } type="button" value="-" onClick={restarCamisetasCarrito}/>
            <input className='cantidadContadorCarrito' type="number" defaultValue={cantidadCamisetas} />
            <input className='botonesContadorCarrito' type="button" value="+" onClick={sumarCamisetasCarrito} />
        </div>
    )
}

export default ContadorCarrito