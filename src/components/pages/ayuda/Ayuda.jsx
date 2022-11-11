import React from 'react'
import './Ayuda.css'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Acordeon from '../../moleculs/acordeon/Acordeon';
import Banner from '../../atoms/banner/Banner';
import { Icon } from '@iconify/react';

const Ayuda = () => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const rutaSinBarra = ruta.pathname.replace("/", " ");
        setTitulo(rutaSinBarra);
    }, [ruta]);

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let vistaComputadora = mediaQuery.matches;

    return (
        <>
            <main>
                {
                    vistaComputadora &&
                    <Banner />
                }
                <section className='sectionBreadcrumb d-flex'>
                    <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                    <p className='ms-1 breadcrumb'>{titulo}</p>
                </section>
                <section className='sectionAyudaDesktop'>
                    <div className='contenedorCategoriasFaqs'>
                        <h2 className='tituloCategoriasFaqs'>COMPRAS</h2>
                        <Acordeon keyPregunta="1" pregunta="Pregunta número 1" respuesta= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                        <Acordeon keyPregunta="2" pregunta="Pregunta número 2" respuesta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                        <Acordeon keyPregunta="3" pregunta="Pregunta número 3" respuesta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                    </div>
                    <div className='contenedorCategoriasFaqs'>
                        <h2 className='tituloCategoriasFaqs'>SUBASTAS</h2>
                        <Acordeon keyPregunta="1" pregunta="Pregunta número 1" respuesta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                        <Acordeon keyPregunta="2" pregunta="Pregunta número 2" respuesta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                        <Acordeon keyPregunta="3" pregunta="Pregunta número 3" respuesta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                    </div>
                    <div className='contenedorCategoriasFaqs'>
                        <h2 className='tituloCategoriasFaqs'>ENVIOS</h2>
                        <Acordeon keyPregunta="1" pregunta="Pregunta número 1" respuesta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                        <Acordeon keyPregunta="2" pregunta="Pregunta número 2" respuesta="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quae fugit temporibus laborum, quod deserunt sed at, amet, vel sequi porro dolores. Velit eum itaque deserunt molestias quisquam, nemo temporibus!" />
                    </div>
                    <div className='mt-5'>
                        <p>¿Necesitas más ayuda? <a href="http://wa.me/+5491131867585?&text=Hola, quería hacer una consulta acerca de" className='linkContactanos' target="_blank" rel="noopener noreferrer">Contactanos</a></p>
                    </div>
                </section>
                <section>
                    <a href="https://wa.me/+5491131867585?&text=Hola, quería hacer una consulta acerca de" target="blank">
                        <Icon className='botonWhatsapp' icon="logos:whatsapp-icon" />
                    </a>
                </section>
            </main>
        </>
    )
}

export default Ayuda