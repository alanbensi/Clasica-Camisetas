import React from 'react'
import { useState, useEffect } from 'react'
import './ContadorCarrito.css'

const ContadorCarrito = (stock) => {

    const [cantidadCamisetas, setcantidadCamisetas] = useState(contador);
    const [contador, setContador] = useState(1);
    const [errorMsj, setErrorMsj] = useState('');

    const sumarCamisetasCarrito = ()=> {
        
        if(contador < parseInt(stock.stock)){
            setContador (contador + 1);
        }
        else{
            setErrorMsj(`Stock máximo: ${stock.stock} unidades`)
        }
    }
    const restarCamisetasCarrito = () => {
        if (contador !== 1){
            setContador (contador - 1);
        }
    }

    useEffect (()=>{
        setcantidadCamisetas (contador)
        if(contador < parseInt(stock.stock)){
            setErrorMsj('')
        }
    },[contador])

    return (
        <>
            <div className='d-flex align-items-center'>
                <input className= {contador !== 1 ? 'botonesContadorCarrito' : 'botonesContadorCarrito disabled' } type="button" value="-" onClick={restarCamisetasCarrito}/>
                <input className='cantidadContadorCarrito' type="number" defaultValue={cantidadCamisetas} />
                <input className='botonesContadorCarrito' type="button" value="+" onClick={sumarCamisetasCarrito} />
            </div>
            {errorMsj && <p className='px-2 mt-2 msjError'>{errorMsj}</p>}
        </>
    )
}

export default ContadorCarrito