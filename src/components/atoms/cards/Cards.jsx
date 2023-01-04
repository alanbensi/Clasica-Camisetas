import React, { useContext } from 'react'
import Card  from 'react-bootstrap/Card'
import { SwitchDivisaContext } from '../../context/SwitchDivisaContext';
import './Cards.css'
const Cards = (props) => {

    const calculoDescuento = (props.discount * props.precio) / 100;

    const precioFinal = props.precio - calculoDescuento;

    const switchDivisa = useContext(SwitchDivisaContext);
    const { switchDivisaContexto } = switchDivisa; 

    return (
        <Card className='cards'>
            <Card.Img className='cardsImage' variant="top" src={props.img} />
            <Card.Body className='reducirPaddingCard'>
                <h3 className='textoCard tituloCard'>{props.titulo}</h3>
            </Card.Body>
            {switchDivisaContexto ?  
                (
                    <Card.Footer className='cardFooter'> 
                        <h3 className='tituloFooterCard'>
                            {props.precioDolar} USD
                        </h3>
                    </Card.Footer>
                )
                :
                (
                    <Card.Footer className='cardFooter'>
                        {props.discount ? 
                            (
                                <h3 className='tituloFooterCard'>
                                    <span className='spanPrecioAntiguo'>${props.precio}</span>
                                    ${precioFinal}
                                </h3>
                            ) 
                            :
                            (
                                <h3 className='tituloFooterCard'>
                                    ${props.precio}
                                </h3>
                            )
                        }
                    </Card.Footer>
                )
            }

        </Card>
    )
}

export default Cards