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
                <Carousel.Item interval={2500} className ="cardCarrusel">
                    <h3>Temporada actual</h3>
                    <img className="imagenesCarrusel" src={fotoTempActual} alt="Temporada actual" />
                </Carousel.Item>
                <Carousel.Item interval={2500} className ="cardCarrusel">
                    <h3>Retros de colección</h3>
                    <img className="imagenesCarrusel" src={fotoRetroDeColeccion} alt="Retros de coleccion" />
                </Carousel.Item>
                <Carousel.Item interval={2500} className ="cardCarrusel">
                    <h3>Otros</h3>
                    <img className="imagenesCarrusel" src={fotoCategoriaOtros} alt="Otros" />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Slider