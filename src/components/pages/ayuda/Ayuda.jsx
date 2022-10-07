import React from 'react'
import './Ayuda.css'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Boton from '../../atoms/boton/Boton';
import Acordeon from '../../moleculs/acordeon/Acordeon';

const Ayuda = () => {

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const rutaSinBarra = ruta.pathname.replace("/", " ");
        setTitulo(rutaSinBarra);
    }, [ruta]);

    return (
        <>
            <main className='mainAyudaDesktop'>
                <section className='d-flex mt-2'>
                    <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                    <h1 className='ms-1 tituloAyuda'>{titulo}</h1>
                </section>
                <section>
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
                        <p>¿Necesitas más ayuda? <Link to='/' className='linkContactanos'>Contactanos</Link></p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Ayuda