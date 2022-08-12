import React from 'react'
import { Accordion } from 'react-bootstrap'
import './Acordeon.css'

const Acordeon = (props) => {
    return (
        <>
            <Accordion className="estilosAcordeon">
                <Accordion.Item eventKey= {props.keyPregunta}>
                    <Accordion.Header>{props.pregunta}</Accordion.Header>
                    <Accordion.Body>
                        {props.respuesta}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default Acordeon