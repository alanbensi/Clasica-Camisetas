import React from 'react'
import './DetalleCamisetas.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Boton from '../../atoms/boton/Boton';
import { Icon } from '@iconify/react';
import { useFetchData } from "../../../hooks/useFetch";
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';

const DetalleCamisetas = () => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    const [camiseta, setCamiseta] =useState ({});
    const [id, setId] = useState(0);

    useEffect(() => {
        const pathname = ruta.pathname.split("/");
        setId(pathname[2])
    }, [ruta]);

    const { fetchData, data, loading } = useFetchData(`/products/${id}`);

    useEffect(() => {
        fetchData();
    }, [id])


    useEffect(() => {
        if (data.length > 0){
            setCamiseta(data[0])
        }
    }, [data])


    let precioFinalSinDescuento = 2 * camiseta.price;
    let descuentoNumeroFinal = (precioFinalSinDescuento * camiseta.discount) /100; 
    let precioFinalConDescuento = precioFinalSinDescuento - descuentoNumeroFinal;

    let carrito = [];
    if (localStorage.getItem('Carrito')) { carrito = JSON.parse(localStorage.getItem('Carrito'))}

    const agregarAlCarrito = ()=> {
        carrito.push (camiseta);
        localStorage.setItem("Carrito", JSON.stringify(carrito));
        console.log ("Carrito ok", carrito);
    };


    // PREGUNTAR A JOSE PARA HACER EL SELECT
    //
    //
    //const [cantidadSelect, setCantidadSelect] = useState(1)
    //
    //
    // useEffect(() => {
    //     if (cantidadSelect < camiseta.stock) {
    //         camiseta.map (()=> {
                
    //         })
    //         setCantidadSelect(cantidadSelect + 1)
    //         console.log ("CANTIDAD DEL SELECT: ", cantidadSelect)
    //     }
    // }, [])


    //SE ROMPIO EL USEFETCH Y ME APARECE BIEN LA IMAGEN + TITULO PERO FALLA PRECIO Y DESCRIPCION
    

    


    return (
        <>
        {loading ? 
        (<LoadingSpinner />)
        :
        (
        <main className='px-3'>
            <section className='d-flex mt-2'>
                <Link className='breadcrumb me-1' to='/'>Inicio {'>'}</Link>
                <Link className='breadcrumb' to='/'>Productos {'>'}</Link>
                <p className='ms-1'>{titulo}</p>
            </section>
            <section>
                <h1 className='tituloDetalleCamiseta'>{camiseta.name}</h1>
                <div className='d-flex justify-content-center'>
                    <div className='contenedorImgDetalle'>
                        <img className='imgDetalle' src={camiseta.images} alt={camiseta.name} />
                        {camiseta.discount &&
                            <div className='contenedorDescuentoDetalle'>
                                <p>-{camiseta.discount}%</p>
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
                
                <input className='inputDetalleCamisetas' type="text" placeholder={`Cantidad: 2 (Stock disponible: ${camiseta.stock})`} />
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
                <p>{camiseta.description}</p>
            </section>
        </main>
        )
        }
        </>
    )
}

export default DetalleCamisetas