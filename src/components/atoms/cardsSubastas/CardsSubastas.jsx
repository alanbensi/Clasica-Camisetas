import React from 'react'
import Card from 'react-bootstrap/Card'
import './CardsSubastas.css'

const CardsSubastas = (props) => {

    let dateMessage = '22/10/2022'
    let [targetDay] = (dateMessage).split('/')

    let timeMessage = '16:00'
    let [targetHour, targetMin] = (timeMessage).split(':')

    let targetDate = new Date()
    targetDate.setFullYear(targetDay)
    targetDate.setHours(targetHour)
    targetDate.setMinutes(targetMin)
    targetDate.setSeconds(0)
    targetDate.setMilliseconds(0)

    setInterval(() => {
        let currentDate = new Date()
        let difference = targetDate.getTime() - currentDate.getTime()
        let remainingTime = new Date(difference)
        let days = remainingTime.getUTCDate() - 1
        let hours = remainingTime.getUTCHours()
        let minutes = remainingTime.getUTCMinutes()
        let seconds = remainingTime.getUTCSeconds()

        console.log(`Faltan ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`)
    }, 1000)


    return (
        <Card className='cardSubasta'>
            <Card.Img variant="top" src={props.imgSubasta} />
            <Card.Body>
                <h3 className='textoCard tituloCardSubasta'>{props.tituloSubasta}</h3>
            </Card.Body>
            <Card.Footer className='cardFooter'>
                <h3 className='textoCard tituloFooterCard'>Termina en <span></span><span></span><span>EN ESTOS SPAN NECESITO USAR LAS HORAS, SEGUNDOS Y MINUTOS</span></h3>
            </Card.Footer>
            <div className='containerOfertaActual'>
                <p className='textoCard'> Oferta actual: <br /> {props.ofertaActual}</p>
            </div>
        </Card>
    )
}

export default CardsSubastas