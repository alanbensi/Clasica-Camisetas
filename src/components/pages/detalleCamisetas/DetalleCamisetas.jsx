import React, { useContext } from 'react'
import './DetalleCamisetas.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Boton from '../../atoms/boton/Boton';
import { Icon } from '@iconify/react';
import { useFetchData } from "../../../hooks/useFetch";
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';
import { Form } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import ModalBootstrap from '../../moleculs/ModalBootstrap/ModalBootstrap';
import ModalMediosPago from '../../atoms/modalMediosPago/ModalMediosPago';
import Swal from 'sweetalert';
import { UserContext } from '../../context/UserContext';
import {SwitchDivisaContext} from '../../context/SwitchDivisaContext';

const DetalleCamisetas = () => {
    const urlBase = 'https://nombre-de-la-pagina.com'
    const cartContext = useContext(CartContext);
    const { setCarritoContexto } = cartContext;
    const userContext = useContext(UserContext);
    const { userAdmin, token} = userContext;
    const switchDivisa = useContext(SwitchDivisaContext);
    const { switchDivisaContexto } = switchDivisa; 

    console.log (switchDivisaContexto, "switch en detalle")

    const ruta = useLocation();
    const [camiseta, setCamiseta] = useState({});
    const [id, setId] = useState(0);
    const [cantidadSelect, setCantidadSelect] = useState(1);

    useEffect(() => {
        const pathname = ruta.pathname.split("/");
        setId(pathname[2])
    }, [ruta]);

    const { fetchData, data, loading } = useFetchData(`/products/${id}`);

    useEffect(() => {
        fetchData();
    }, [id])


    useEffect(() => {
        if (data.length > 0) {
            setCamiseta(data[0])
        }
    }, [data])


    let precioFinalSinDescuento = camiseta.price;
    let descuentoNumeroFinal = (precioFinalSinDescuento * camiseta.discount) / 100;
    let precioFinalConDescuento = precioFinalSinDescuento - descuentoNumeroFinal;

    let carrito = [];
    if (localStorage.getItem('Carrito')) { carrito = JSON.parse(localStorage.getItem('Carrito')) }

    const redirect = useNavigate();
    const handleSwal = (info) => {
        if (info.buttons.length > 1) {
            Swal({
                title: info.title,
                text: info.text,
                icon: info.icon,
                buttons: info.buttons,
                timer: info.timer
            })
                .then(resp => {
                    if (resp) {
                        redirect(info.link)
                    }
                })
        } else {
            Swal({
                title: info.title,
                text: info.text,
                icon: info.icon,
                buttons: info.buttons,
                timer: info.timer
            })
        }
    }

    const agregarAlCarrito = () => {
        const compra = camiseta;
        compra.precioFinal = camiseta.discount ? (precioFinalConDescuento) : (precioFinalSinDescuento);
        compra.cantidad = cantidadSelect;
        if (carrito.some(item => item.id === compra.id)) {
            handleSwal({
                title: "Esta camiseta ya esta agregada al carrito",
                text: "Si querés modificar la cantidad, podés hacerlo desde el carrito",
                icon: 'warning',
                buttons: ['Cerrar', 'Ir al carrito'],
                link: "/Carrito-de-compras",
                timer: ''
            });
        } else {
            carrito.push(compra);
            localStorage.setItem("Carrito", JSON.stringify(carrito));
            setCarritoContexto(carrito.length);
            handleSwal({
                title: "Camiseta agregada con exito!",
                text: "La camiseta se agregó exitosamente al carrito.",
                icon: 'success',
                buttons: ['Cerrar'],
                timer: '3000'
            });
        }
    };

    const comprarCarrito = () => {
        const compra = camiseta;
        compra.precioFinal = camiseta.discount ? (precioFinalConDescuento) : (precioFinalSinDescuento);
        compra.cantidad = cantidadSelect;
        if (carrito.some(item => item.id === compra.id)) {
            handleSwal({
                title: "Esta camiseta ya esta agregada al carrito",
                text: "Si querés modificar la cantidad, podés hacerlo desde el carrito",
                icon: 'warning',
                buttons: ['Cerrar', 'Ir al carrito'],
                link: "/Carrito-de-compras",
                timer: ''
            });
        } else {
            carrito.push(compra);
            localStorage.setItem("Carrito", JSON.stringify(carrito));
            setCarritoContexto(carrito.length);
            redirect("/Carrito-de-compras");
        }
    };

    const select = [];
    for (let index = 1; index <= camiseta.stock; index++) {
        select.push({ value: index, label: index })
    }

    const handleClick = (e) => {
        setCantidadSelect(parseInt(e.target.value));
    }

    const eliminarProducto = () => {
        Swal({
            title: "¿Estás seguro que deseas borrar este producto?",
            text: "Tendrás que volver a agregarlo desde la plataforma",
            icon: "warning",
            buttons: {
                cancel: "Salir",
                catch: {
                    text: "Eliminar",
                    className: "botonRojo"
                }},
        }).then((willDelete) => {
                if (willDelete) {
                    const fetchOptions = {
                        method: 'DELETE',
                        headers: { 
                            "Content-Type": "application/json",  
                            "authorization": `Bearer ${token}`
                        },
                    }
                    fetch(`http://127.0.0.1:3001/products/${camiseta.id}`, fetchOptions)
                        .then(res => {
                            if (res.status !== 200) {
                                Swal("La camiseta se elimino con exito!", {
                                    icon: "success",
                                    buttons: 'Cerrar',
                                    timer: ''
                                });
                                redirect ("/");
                            } else {
                                Swal({
                                    title: "Ocurrió un error.",
                                    text: "La camiseta no pudo borrarse de la plataforma.",
                                    icon: 'error',
                                    buttons: 'Cerrar',
                                    timer: ''
                                });
                            }
                        })
                }
            });
    }

    const [descuentoCamiseta, setDescuentoCamiseta] = useState(0);

    useEffect(() => {
        if (switchDivisaContexto) {
            setDescuentoCamiseta (0);
        }else {
            setDescuentoCamiseta (camiseta.discount);
        }
    }, [[],switchDivisaContexto]);
    

    return (
        <>
            {loading ?
                (<LoadingSpinner />)
                :
                (
                    <main className='px-3'>
                        <nav className='mt-3' aria-label="breadcrumb">
                            <ul className='breadcrumb'>
                                <li className='breadcrumb-item'>
                                    <Link className='estiloLinks' to='/'>Inicio </Link>
                                </li>
                                <li className='breadcrumb-item'>
                                    <Link className='estiloLinks breadcrumbSobresale' to={`/Productos/${camiseta.collection}`}>{camiseta.collection}</Link>
                                </li>
                                <li className='breadcrumb-item active'>
                                    <p className='breadcrumbSobresale camisetaBreadcrumb'>{camiseta.name}</p>
                                </li>
                            </ul>
                        </nav>
                        <section className='sectionDetalleCamiseta'>
                            <h1 className='tituloDetalleCamiseta'>{camiseta.name}</h1>
                            {
                                userAdmin ?
                                    (
                                        <div>
                                            <span className='iconoEditar'>
                                                <Link className='estiloLinks' to={`/admin/formularioCamisetas/${camiseta.id}`}>
                                                    <Icon icon="el:pencil-alt" />
                                                </Link>
                                            </span>
                                            <span onClick={eliminarProducto} className='iconoEliminar'>
                                                <Icon icon="fluent:delete-28-regular" />
                                            </span>
                                        </div>
                                    )
                                    :
                                    (null)
                            }
                            <div className='d-flex justify-content-center'>
                                <div className='contenedorImgDetalle'>
                                    <img className='imgDetalle' src={camiseta.images} alt={camiseta.name} />
                                    {descuentoCamiseta !== 0 && !switchDivisaContexto ?
                                        (<div className='contenedorDescuentoDetalle'>
                                            <p>-{descuentoCamiseta}%</p>
                                        </div>)
                                        :
                                        ("")
                                    }
                                </div>
                            </div>
                            {descuentoCamiseta === 0 && !switchDivisaContexto &&
                                (<div className='mt-3 ms-3'>
                                    <h2>${precioFinalSinDescuento}</h2>
                                </div>)
                            }
                            {descuentoCamiseta === 0 && switchDivisaContexto && 
                                (<div className='mt-3 ms-3'>
                                    <h2>{camiseta.price_usd} USD</h2>
                                </div>
                                )
                            }
                            {descuentoCamiseta !== 0 && !switchDivisaContexto && 
                                (<div className='mt-3 ms-3 d-flex align-items-center'>
                                    <h2 className='precioNormal'>${precioFinalSinDescuento}</h2>
                                    <h2 className='ms-2'>${precioFinalConDescuento}</h2>
                                </div>)
                            }
                            {descuentoCamiseta !== 0 && switchDivisaContexto &&
                                (<div className='mt-3 ms-3'>
                                    <h2>{camiseta.price_usd} USD</h2>
                                </div>
                                )
                            }
                            <ModalBootstrap clase='metodosDetalleCamisetas' textoBoton='Ver métodos de pago' titulo='Métodos de pago' contenido={<ModalMediosPago />} />
                        </section>
                        <section className=''>
                            <Form.Select onChange={(e) => { handleClick(e) }} aria-label="Default select example">
                                <option>Selecciona cantidad (Stock disponible: {camiseta.stock})</option>
                                {
                                    select.map((item) => (<option key={item.label} value={item.value}>{item.label}</option>))
                                }
                            </Form.Select>
                            <Boton onClick={comprarCarrito} estilo='botonAzul botonLogin' texto='Comprar' />
                            <Boton onClick={agregarAlCarrito} estilo='botonBlanco botonLogin agregarCarritoDetalleCamiseta' texto='Agregar al carrito' />
                        </section>
                        <section className='d-flex mt-4 mb-2'>
                            <p className='me-2 compartirDetalleCamisetas'>COMPARTIR</p>
                            <div>
                                <a href={`mailto:?subject=Mira esta camiseta &body=Hola! Cómo estás? Esta camiseta es especial para vos!LINK: ${urlBase}${ruta.pathname}`} rel="noopener noreferrer">
                                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:gmail" width='20px' />
                                </a>
                                <a href={`https://api.whatsapp.com/send?text=Mira esta camiseta en ${urlBase}${ruta.pathname}`} target="_blank" rel="noopener noreferrer">
                                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:whatsapp" width='20px' />
                                </a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlBase}${ruta.pathname}&t=Mira esta camiseta`} target="_blank" rel="noopener noreferrer">
                                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:facebook" width='20px' />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?text=Mira esta camiseta ${urlBase}${ruta.pathname}`} target="_blank" rel="noopener noreferrer">
                                    <Icon className='mx-2 logosDetalleCamisetas' icon="mdi:twitter" width='20px' />
                                </a>
                            </div>
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