import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DetalleSubastas.css';
import { useCountdown } from '../../../hooks/useCountdown'

const DetalleSubastas = ({camiseta}) => {
    const date2 = "22/10/2022"
    const time2 = "00:00"

    const {timeCounter ,daysLeft, hoursLeft, minutesLeft, secondsLeft} = useCountdown(date2, time2);
    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);

    setInterval(() => {
        timeCounter()
     }, 5000)

    return (
        <main className='px-3'>
            <section className='d-flex mt-2 mb-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <Link className='breadcrumb ms-1' to='/Subastas'>Subastas {'>'}</Link>
                <p className='ms-1'>{titulo}</p>
            </section>
            <section>
                <h1 className='tituloDetalleSubastas'>Camiseta Lorem ipsum, dolor sit amet</h1>
                <h3 className=''>Termina en <span>{daysLeft} dias </span><br/><span>{hoursLeft} hr </span><span>{minutesLeft} min</span> <span>{secondsLeft} seg</span></h3>  
            </section>
        </main>
    )
}

export default DetalleSubastas