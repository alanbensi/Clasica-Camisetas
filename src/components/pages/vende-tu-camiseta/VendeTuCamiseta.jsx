import React from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../../assets/futbol-concepto-exito-meta.jpg';
import './VendeTuCamiseta.css';

const VendeTuCamiseta = () => {

    const ruta = useLocation (); 

    return (
        <div>
            <Banner />
            <div className='containerVenderCamiseta'>
                <h1>VENDÉ TU CAMISETA</h1>
                <h2>{ruta.pathname}</h2>  
                <p>Si tenés alguna camiseta de fútbol nacional o extranjero y estás interesado en venderla, hacé <a href="http://" target="_blank" rel="noopener noreferrer">click acá</a> , llená el formulario y nos pondremos en contacto para hacerte una oferta.</p>
            </div>
        </div>
    )
}

export default VendeTuCamiseta