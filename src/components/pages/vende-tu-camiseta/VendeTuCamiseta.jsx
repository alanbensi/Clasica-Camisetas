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
            <div className='d-flex containerBreadcrumb mt-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <p className='ms-1'>{titulo}</p> 
            </div>
            <div className='containerVenderCamiseta'>
                <h1>VENDÉ TU CAMISETA</h1>
                <p>Si tenés alguna camiseta de fútbol nacional o extranjero y estás interesado en venderla, hacé <a href="http://" target="_blank" rel="noopener noreferrer">click acá</a>, llená el formulario y nos pondremos en contacto para hacerte una oferta.</p>
            </div>
        </div>
    )
}

export default VendeTuCamiseta