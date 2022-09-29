import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ContadorCarrito from '../../atoms/contadorCarrito/ContadorCarrito';
import './Carrito.css'
import { Icon } from '@iconify/react';
import Boton from '../../atoms/boton/Boton'


const Carrito = () => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);

    const [carrito, setCarrito] = useState ([]);

    const [cambioContador, setCambioContador] = useState(true);

    const borrarItem = (id)=> {
        setCarrito (carrito.filter((item)=>item.id !== id));        
    };

    useEffect (()=>{
        if (localStorage.getItem('Carrito')) {setCarrito(JSON.parse(localStorage.getItem('Carrito')))};
    },[cambioContador]);

    useEffect(() => {
    console.log ("No me importa ", carrito);
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    },[carrito]);


    const contador = ()=> {
        const local= localStorage.getItem('Carrito')
        setCarrito (JSON.parse(local));
        setCambioContador (!cambioContador);
    }

    const precioPorCantidad = (precio, cantidad) => {
        return precio*cantidad; 
    }

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
                    <div>
                        <div className='d-flex justify-content-around my-4'>
                            <img className='imgCardCarrito' src={item.images} alt={item.name} />
                            <div className='w-100'>
                                <h2 className='nombreCamisetaCardCarrito'>{item.name}</h2>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <ContadorCarrito handleClick= {contador} carrito={carrito} camiseta={item}/>
                                    <p className='m-0'>${precioPorCantidad(item.precioNormal, item.cantidad)}</p>
                                </div>
                            </div>
                            <div>
                                <Icon onClick={() => borrarItem(item.id)} icon="codicon:chrome-close" width='20px' /> 
                            </div>
                        </div>
                    </div>
                    )))
                    :
                    (<p>Todavía no agregaste productos al carrito</p>)
                    }
                    {
                        carrito.length !== 0 &&
                    (
                    <>
                        <div>
                            {/* <h3 className='subtotalCarrito'>Subtotal (sin envío): ${item.precioNormal}</h3> */}
                            <p className='envioGratisCarrito'>Envío gratis</p>
                        </div>
                        <div className='mb-3'>
                            <div className='containerTotalCarrito'>
                                {/* <h3 className='totalCarrito'>Total: ${item.precioNormal}</h3> */}
                                <Link className='estiloLinks' to="/Detalle-de-compra" ><Boton estilo="botonIniciarCompra botonAzul" texto="Iniciar compra" /></Link>
                            </div>
                        </div>
                    </>
                    )
                    }
                </div>
            </section>
        </main>
    )
}

export default Carrito