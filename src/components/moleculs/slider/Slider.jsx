import React from 'react'
import './Slider.css'
import { Carousel } from 'react-bootstrap'
import fotoTempActual from '../../../assets/camiseta 1.png'
import fotoRetroDeColeccion from '../../../assets/Camiseta 8.png'
import fotoCategoriaEntrenamientos from '../../../assets/camiseta 4.png'
import { Link } from 'react-router-dom'


const Slider = () => {
    return (
        <>
            <Carousel variant="dark">
                <Carousel.Item interval={3500}>
                    <Link to='/Productos/Camisetas temporada actual' className='estiloLinks'>
                        <div className="cardCarrusel">
                            <h3 className='tituloCardCarrusel'>Camisetas temporada actual</h3>
                            <img className="imagenesCarrusel" src={fotoTempActual} alt="Temporada actual" />
                        </div>
                    </Link>
                </Carousel.Item>
                <Carousel.Item interval={3500}>
                    <Link to='/Productos/Retros de coleccion' className='estiloLinks'>
                        <div className ="cardCarrusel">
                            <h3 className='tituloCardCarrusel'>Retros de colección</h3>
                            <img className="imagenesCarrusel" src={fotoRetroDeColeccion} alt="Retros de coleccion" />
                        </div>
                    </Link>
                </Carousel.Item>
                <Carousel.Item interval={3500}>
                    <Link to='/Productos/Entrenamiento y salidas' className='estiloLinks'>
                        <div className="cardCarrusel">
                            <h3 className='tituloCardCarrusel'>Entrenamientos y salidas</h3>
                            <img className="imagenesCarrusel" src={fotoCategoriaEntrenamientos} alt="Entrenamientos y salidas" />
                        </div>
                    </Link>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Slider