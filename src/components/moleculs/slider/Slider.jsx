import React from 'react'
import './Slider.css'
import { Carousel } from 'react-bootstrap'
import fotoTempActual from '../../../assets/camiseta 1.png'
import fotoRetroDeColeccion from '../../../assets/Camiseta 8.png'
import fotoCategoriaOtros from '../../../assets/camiseta 3.png'


const Slider = () => {
    return (
        <>
            <Carousel variant="dark">
                <Carousel.Item interval={3500}>
                    <div className ="cardCarrusel">
                        <h3 className='tituloCardCarrusel'>Temporada actual</h3>
                        <img className="imagenesCarrusel" src={fotoTempActual} alt="Temporada actual" />
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={3500}>
                    <div className ="cardCarrusel">
                        <h3 className='tituloCardCarrusel'>Retros de colección</h3>
                        <img className="imagenesCarrusel" src={fotoRetroDeColeccion} alt="Retros de coleccion" />
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={3500}>
                    <div className ="cardCarrusel">
                        <h3 className='tituloCardCarrusel'>Otros</h3>
                        <img className="imagenesCarrusel" src={fotoCategoriaOtros} alt="Otros" />
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Slider