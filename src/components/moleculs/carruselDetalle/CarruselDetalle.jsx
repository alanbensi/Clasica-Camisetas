import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarruselDetalle.css';

const CarruselDetalle = (props) => {

    return (
        <div className= {props.className}>
            <Carousel  slide={false} variant="dark">
                {props.images && props.images.map (img => (
                    <Carousel.Item>
                        <img
                            className="d-block w-100 imgCarrusel mb-3 mr-5 ml-5"
                            src={img}
                            alt={props.alt}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default CarruselDetalle