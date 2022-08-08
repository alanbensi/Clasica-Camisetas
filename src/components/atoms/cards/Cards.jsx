import React from 'react'
import Card  from 'react-bootstrap/Card'
import './Cards.css'

const Cards = ({img,titulo,precio,precioAntiguo}) => {
    return (
        <Card className='cards'>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <h3 className='textoCard tituloCard'>{titulo}</h3>
            </Card.Body>
            {precio &&  
                <Card.Footer className='cardFooter'>
                    <h3 className='textoCard tituloFooterCard'>{precioAntiguo ?<span className='spanPrecioAntiguo'>{precioAntiguo}</span>: false}{precio}</h3>
                </Card.Footer>
            }
        </Card>
    )
}

export default Cards