import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import CardsSubastas from '../../atoms/cardsSubastas/CardsSubastas';
import './Subastas.css'

const Subastas = () => {

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
                <p className='ms-1'>{titulo}</p>
            </section>
            <section>
                <h1 className='tituloSubastas'>Subastas activas</h1>
                <Container className='p-0'>
                    <Row>
                        <Col lg={3} md={6} xs={6}>
                            <Link to={`/Detalle-subastas`} className='estiloLinks'>
                                <CardsSubastas imgSubasta='adfsdf' tituloSubasta='Camiseta 1' />
                            </Link>
                        </Col>
                        <Col lg={3} md={6} xs={6}>
                            <CardsSubastas imgSubasta='adfsdf' tituloSubasta='Camiseta 1' />
                        </Col>
                        <Col lg={3} md={6} xs={6}>
                            <CardsSubastas imgSubasta='adfsdf' tituloSubasta='Camiseta 1' />
                        </Col>
                        <Col lg={3} md={6} xs={6}>
                            <CardsSubastas imgSubasta='adfsdf' tituloSubasta='Camiseta 1' />
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Subastas