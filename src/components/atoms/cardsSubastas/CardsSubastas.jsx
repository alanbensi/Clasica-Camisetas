import React from 'react';
import Card from 'react-bootstrap/Card';
import './CardsSubastas.css';
import { useCountdown } from '../../../hooks/useCountdown';

const CardsSubastas = (props) => {
    const date= '';
    const time='';

    const {timeCounter ,daysLeft, hoursLeft, minutesLeft, secondsLeft} = useCountdown(date, time);
    
    setInterval(() => {
       timeCounter()
    }, 1000)

    return (
        <Card className='cardSubasta'>
            <Card.Img variant="top" src={props.imgSubasta} />
            <Card.Body>
                <h3 className='textoCard tituloCardSubasta'>{props.tituloSubasta}</h3>
            </Card.Body>
            <Card.Footer className='cardFooter'>
                { secondsLeft && 
                    <h3 className='textoCard tituloFooterCard'>Termina en <span>{daysLeft} dias </span><br/><span>{hoursLeft} hr </span><span>{minutesLeft} min</span> <span>{secondsLeft} seg</span></h3>
                }
            </Card.Footer>
            <div className='containerOfertaActual'>
                <p className='textoCard'> Oferta actual: <br /> {props.ofertaActual}</p>
            </div>
        </Card>
    )
}

export default CardsSubastas