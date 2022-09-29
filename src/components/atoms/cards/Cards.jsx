import React from 'react'
import Card  from 'react-bootstrap/Card'
import './Cards.css'

const Cards = (props) => {

    const calculoDescuento = (props.discount * props.precio) / 100;

    const precioFinal = props.precio - calculoDescuento;

    return (
        <Card className='cards'>
            <Card.Img className='cardsImage' variant="top" src={props.img} />
            <Card.Body className='reducirPaddingCard'>
                <h3 className='textoCard tituloCard'>{props.titulo}</h3>
            </Card.Body>
            {props.precio &&  
                <Card.Footer className='cardFooter'>
                    {
                        props.discount ? 
                        (
                            <h3 className='textoCard tituloFooterCard'>
                                <span className='spanPrecioAntiguo'>${props.precio}</span>
                                ${precioFinal}
                            </h3>
                        )
                        :
                        (
                            <h3 className='textoCard tituloFooterCard'>
                                ${props.precio}
                            </h3>
                        )
                    }
                </Card.Footer>
            }
        </Card>
    )
}

export default Cards