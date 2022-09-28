import React, { useState } from 'react'
import Banner from '../../atoms/banner/Banner'
import Cards from '../../atoms/cards/Cards'
import {Container, Row, Col} from 'react-bootstrap'
import './Inicio.css'
import { Icon } from '@iconify/react'
import Slider from '../../moleculs/slider/Slider'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../atoms/loading/LoadingSpinner'


const Inicio = () => {

    const [cargando, setCargando] = useState(false)


    return (
        <div>
            {cargando ? 
                (<LoadingSpinner/>) 
            : 
                (<>
                    <Banner />
                    <h1 className='tituloInicio'>BIENVENIDOS A CLÁSICA 1905</h1>
                    <Slider />
                    <div className='contenedorEnviosGratis'>
                        <Icon icon="carbon:delivery" width='32px' color='white' />
                        <p className='textoEnviosGratis'>Envios gratis a todo el pais</p>
                    </div>
                    <h2 className='titOfertasInicio'>OFERTAS</h2>
                    <Container>
                        <Row>
                            <Col lg={3} md={6} xs={6}>
                                <Link to="/Detalle-Camisetas" className='estiloLinks'>
                                    <Cards img='adfsdf' titulo='Camiseta 1' precio='$10000.00' precioAntiguo='$20000' />
                                </Link>
                            </Col>
                            <Col lg={3} md={6} xs={6}>
                                <Cards img='adfsdf' titulo='Camiseta 1' precio='$10000.00' precioAntiguo='$20000' />
                            </Col>
                            <Col lg={3} md={6} xs={6}>
                                <Cards img='adfsdf' titulo='Camiseta 1' precio='$10000.00' precioAntiguo='$20000' />
                            </Col>
                            <Col lg={3} md={6} xs={6}>
                                <Cards img='adfsdf' titulo='Camiseta 1' precio='$10000.00' precioAntiguo='$20000' />
                            </Col>
                        </Row>
                    </Container>
                </>
                )
            }
        </div>
    )
}

export default Inicio