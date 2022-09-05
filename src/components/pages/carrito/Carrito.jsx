import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ContadorCarrito from '../../atoms/contadorCarrito/ContadorCarrito';
import './Carrito.css'
import { Icon } from '@iconify/react';

const Carrito = () => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);


    const [carrito, setCarrito] = useState ([]);

    const borrarItem = (id)=> {
        setCarrito (carrito.filter((item)=>item.id !== id));        
    };

    useEffect (()=>{
        if (localStorage.getItem('Carrito')) {setCarrito(JSON.parse(localStorage.getItem('Carrito')))};
    },[]);

    useEffect(() => {
    console.log (carrito);
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    },[carrito]);


    return (
        <main className='px-3'>
            <section className='d-flex mt-2 mb-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <p className='ms-1'>{titulo}</p>
            </section>
            <section>
                <h1 className='tituloCarrito'>Carrito de compras</h1>
                <div>
                    {carrito.length !== 0 ? 
                    (carrito.map ((item)=>(
                    <div className='d-flex justify-content-around my-4'>
                        <img className='imgCardCarrito' src={item.imagen} alt={item.nombre} />
                        <div>
                            <h2 className='nombreCamisetaCardCarrito'>{item.nombre}</h2>
                            <ContadorCarrito />
                        </div>
                        <div>
                            <Icon onClick={() => borrarItem(item.id)} icon="codicon:chrome-close" width='20px' /> 
                        </div>
                    </div>
                    )))
                    :
                    (<p>Todavía no agregaste productos al carrito</p>)
                    }
                </div>
            </section>
        </main>
    )
}

export default Carrito