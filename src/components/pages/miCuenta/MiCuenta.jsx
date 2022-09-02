import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './MiCuenta.css'

const MiCuenta = () => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);

    const datosUsuario = {
        fullname: "Alan Bensi",
        email: "abc@gmail.com",
        telefono: "1512345678"
    }

    const pedidosRealizados = {
        numeroPedido: "123",
        fechaPedido: "11/01/2022",
        precioPedido: "45700",
        estadoPedido: "Entregado"
    }

    const subastasRealizadas = {
        numeroSubasta: "321",
        fechaSubasta: "17/6/2021",
        ofertaSubasta: "40200",
        estadoSubasta: "Superada"
    }

    return (
        <main className='px-3'>
            <section className='d-flex mt-2 mb-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <p className='ms-1'>{titulo}</p>
            </section>
            <section>
                <div>
                    <h2 className='titulosMiCuenta'>MIS DATOS</h2>
                    <p>Nombre y apellido: {datosUsuario.fullname}</p>
                    <p>Email: {datosUsuario.email}</p>
                    <p>Telefono: {datosUsuario.telefono}</p>
                </div>
                <div>
                    <h2 className='titulosMiCuenta'>MIS COMPRAS</h2>
                    {pedidosRealizados ?
                    (
                        <table className='tablaCompras'>
                            <tr>
                                <th>Pedido</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>#{pedidosRealizados.numeroPedido}</td>
                                <td>{pedidosRealizados.fechaPedido}</td>
                                <td>${pedidosRealizados.precioPedido}</td>
                                <td>{pedidosRealizados.estadoPedido}</td>                                    
                            </tr>
                        </table>
                    )
                    :
                    (
                        <p>Todavía no realizaste ninguna compra <span role="img" aria-label='icono de cara triste'>😥</span> </p>
                    )
                    }
                </div>
                <div>
                    <h2 className='titulosMiCuenta'>MIS SUBASTAS</h2>
                    {subastasRealizadas? (
                        <table className='tablaCompras'>
                            <tr>
                                <th>Pedido</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>#{subastasRealizadas.numeroSubasta}</td>
                                <td>{subastasRealizadas.fechaSubasta}</td>
                                <td>${subastasRealizadas.ofertaSubasta}</td>
                                <td>{subastasRealizadas.estadoSubasta}</td>
                            </tr>
                        </table>
                    )
                    :
                    (
                        <p>Todavía no realizaste ofertas en subastas <span role="img" aria-label='icono de cara triste'>😥</span></p>
                    )
                    }
                </div>
            </section>
        </main>
    )
}

export default MiCuenta