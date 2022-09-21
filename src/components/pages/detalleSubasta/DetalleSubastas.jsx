import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DetalleSubastas.css';

const DetalleSubastas = ({camiseta}) => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);


    return (
        <main className='px-3'>
            <section className='d-flex mt-2 mb-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <Link className='breadcrumb ms-1' to='/Subastas'>Subastas {'>'}</Link>
                <p className='ms-1'>{titulo}</p>
            </section>
            <section>
                <h1 className='tituloDetalleSubastas'>Camiseta Lorem ipsum, dolor sit amet</h1>
            </section>
        </main>
    )
}

export default DetalleSubastas