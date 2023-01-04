import React from 'react'
import { useState, useEffect } from 'react'
import './ContadorCarrito.css'

const ContadorCarrito = ({camiseta, carrito, handleClick}) => {

    const [cantidadCamisetas, setcantidadCamisetas] = useState(contador);
    const [contador, setContador] = useState(camiseta.cantidad);
    const [errorMsj, setErrorMsj] = useState('');

    const sumarCamisetasCarrito = ()=> {
        
        if(contador < parseInt(camiseta.stock)){
            setContador (contador + 1);
        }
        else{
            setErrorMsj(`Stock máximo: ${camiseta.stock} unidades`)
        }
    }
    const restarCamisetasCarrito = () => {
        if (contador !== 1){
            setContador (contador - 1);
        }
    }

    useEffect (()=>{
        handleClick(contador,camiseta.id);
        setcantidadCamisetas (contador)
        if(contador < parseInt(camiseta.stock)){
            setErrorMsj('')
        }
    },[contador])

    return (
        <div >
            <div className='d-flex align-items-center'>
                <input className= {contador !== 1 ? 'botonesContadorCarrito' : 'botonesContadorCarrito disabled' } type="button" value="-" onClick={restarCamisetasCarrito}/>
                <input className='cantidadContadorCarrito' type="number" defaultValue={cantidadCamisetas} />
                <input className='botonesContadorCarrito' type="button" value="+" onClick={sumarCamisetasCarrito} />
            </div>
            {errorMsj && <p className='px-2 mt-2 msjError'>{errorMsj}</p>}
        </div>
    )
}

export default ContadorCarrito