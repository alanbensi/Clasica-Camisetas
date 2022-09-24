import React from 'react'
import './DetalleCamisetas.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Boton from '../../atoms/boton/Boton';
import { Icon } from '@iconify/react';
import ejemplo from '../../../assets/camiseta 1.png'

const DetalleCamisetas = () => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);

    const camiseta = {
        "nombre" : "Camiseta Boca Juniors Clausura 1997", 
        "imagen" : ejemplo,
        "precioNormal": "10000",
        "descuento" : "10",
        "cantidad" : "3",
        "stock": "5",
        "descripcion": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae expedita placeat, magnam doloribus voluptate enim reiciendis ad quos quasi. Laborum non porro odit sequi error? Earum blanditiis ipsam sed voluptatibus!",
        "id" : "1"
    }

    let precioFinalSinDescuento = camiseta.cantidad * camiseta.precioNormal;
    let descuentoNumeroFinal = (precioFinalSinDescuento * camiseta.descuento) /100; 
    let precioFinalConDescuento = precioFinalSinDescuento - descuentoNumeroFinal;

    let carrito = [];
    if (localStorage.getItem('Carrito')) { carrito = JSON.parse(localStorage.getItem('Carrito'))}

    const agregarAlCarrito = ()=> {
        carrito.push (camiseta);
        localStorage.setItem("Carrito", JSON.stringify(carrito));
        console.log ("Carrito ok", carrito);
    };

    return (
        <>
            <main className='px-3'>
                <section className='d-flex mt-2'>
                    <Link className='breadcrumb me-1' to='/'>Inicio {'>'}</Link>
                    <Link className='breadcrumb' to='/'>Productos {'>'}</Link>
                    <p className='ms-1'>{titulo}</p>
                </section>
                <section>
                    <h1 className='tituloDetalleCamiseta'>{camiseta.nombre}</h1>
                    <div className='d-flex justify-content-center'>
                        <div className='contenedorImgDetalle'>
                            <img className='imgDetalle' src={camiseta.imagen} alt={camiseta.nombre} />
                            {camiseta.descuento &&
                            <div className='contenedorDescuentoDetalle'>
                                <p>-{camiseta.descuento}%</p>
                            </div>
                            }   
                        </div>
                    </div>
                    {camiseta.descuento === "" ? 
                    (<div className='mt-3 ms-3'>
                        <h2>${precioFinalSinDescuento}</h2>
                    </div>)
                    :
                    (<div className='mt-3 ms-3 d-flex align-items-center'>
                        <h2 className='precioNormal'>${precioFinalSinDescuento}</h2>
                        <h2 className='ms-2'>${precioFinalConDescuento}</h2>
                    </div>)
                    }
                    <p className='metodosDetalleCamisetas'>Ver metodos de pago</p>
                </section>
                <section className=''>
                    <input className='inputDetalleCamisetas' type="text" placeholder={`Cantidad: ${camiseta.cantidad} (Stock disponible: ${camiseta.stock})`} />
                    <Boton estilo='botonAzul botonLogin' texto='Comprar' />
                    <Link to="../Carrito-de-compras" className='estiloLinkDetalleBoton'><Boton onClick={agregarAlCarrito} estilo='botonBlanco botonLogin agregarCarritoDetalleCamiseta' texto='Agregar al carrito' /></Link>
                </section>
                <section className='d-flex my-4'>
                    <p className='me-2 compartirDetalleCamisetas'>COMPARTIR</p>
                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:gmail" width='20px' />
                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:whatsapp" width='20px' />
                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:facebook" width='20px' />
                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:twitter" width='20px' />
                </section>
                <section>
                    <h3>Descripción</h3>
                    <p>{camiseta.descripcion}</p>
                </section>
            </main>
        </>
    )
}

export default DetalleCamisetas