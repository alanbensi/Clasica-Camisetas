import React from 'react'
import Card  from 'react-bootstrap/Card'
import './Cards.css'

const Cards = (props) => {

    return (
        <Card className='cards'>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <h3 className='textoCard tituloCard'>{props.titulo}</h3>
            </Card.Body>
            {props.precio &&  
                <Card.Footer className='cardFooter'>
                    <h3 className='textoCard tituloFooterCard'>{props.precioAntiguo ?<span className='spanPrecioAntiguo'>{props.precioAntiguo}</span>: false}{props.precio}</h3>
                </Card.Footer>
            }
        </Card>
    )
}

export default Cards