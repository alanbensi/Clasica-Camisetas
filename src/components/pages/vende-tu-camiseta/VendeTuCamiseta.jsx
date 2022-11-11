import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Banner from '../../atoms/banner/Banner';
import './VendeTuCamiseta.css';

const VendeTuCamiseta = () => {
    const ruta = useLocation (); 
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " "); 
        setTitulo (sinEspacios.replace ("/", " "));
    }, [ruta]);
    
    return (
        <div>
            <Banner />
            <div className='d-flex containerBreadcrumb mt-3 px-3'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <p className='breadcrumb ms-1'>{titulo}</p> 
            </div>
            <div className='containerVenderCamiseta'>
                <h1>VENDÉ TU CAMISETA</h1>
                <p>Si tenés alguna camiseta de Boca y estás interesado en venderla, hacé <a href="https://api.whatsapp.com/send?phone=+5491131867585&text=Hola, quería venderte esta camiseta!" target="_blank" rel="noopener noreferrer">click acá</a>, para que nos pongamos en contacto y hacerte una oferta.</p>
            </div>
        </div>
    )
}

export default VendeTuCamiseta