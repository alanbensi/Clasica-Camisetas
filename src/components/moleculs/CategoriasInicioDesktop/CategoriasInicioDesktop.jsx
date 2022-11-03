import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import fotoTempActual from '../../../assets/camiseta 1.png'
import fotoRetroDeColeccion from '../../../assets/Camiseta 8.png'
import fotoCategoriaEntrenamientos from '../../../assets/camiseta 4.png'
import './CategoriasInicioDesktop.css'

const CategoriasInicioDesktop = () => {
    return (
        <section>
            <Container className='px-5 contenedorCatInicioDesktop'>
                <Row className='contenedorColCatDesktop'>
                    <Col lg={3} md={3}>
                        <Link to='/Productos/Camisetas temporada actual' className='estiloLinks'>
                            <div className="cardCatInicioDesktop">
                                <h3 className='titulocardCatInicioDesktop'>Camisetas temporada actual</h3>
                                <img className="imgCatInicioDesktop tempActualDesktop" src={fotoTempActual} alt="Temporada actual" />
                            </div>
                        </Link>
                    </Col>
                    <Col lg={3} md={3} >
                        <Link to='/Productos/Retros de coleccion' className='estiloLinks'>
                            <div className="cardCatInicioDesktop">
                                <h3 className='titulocardCatInicioDesktop'>Retros de colección</h3>
                                <img className="imgCatInicioDesktop" src={fotoRetroDeColeccion} alt="Retros de coleccion" />
                            </div>
                        </Link>
                    </Col>
                    <Col lg={3} md={3} >
                        <Link to='/Productos/Entrenamiento y salidas' className='estiloLinks'>
                            <div className="cardCatInicioDesktop">
                                <h3 className='titulocardCatInicioDesktop'>Entrenamientos y salidas</h3>
                                <img className="imgCatInicioDesktop" src={fotoCategoriaEntrenamientos} alt="Entrenamientos y salidas" />
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default CategoriasInicioDesktop