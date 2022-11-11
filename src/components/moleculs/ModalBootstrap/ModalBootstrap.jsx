import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ModalBootstrap.css';

const ModalBootstrap = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const icono = props.icono;
    return (
        <>
            <Button className={props.clase} onClick={handleShow}>
                {props.textoBoton}
                {
                    icono && 
                    <Icon className='iconoArrowModal' icon="dashicons:arrow-down" />
                }
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='tituloModal'>{props.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.contenido}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='botonAzul botonLogin' onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalBootstrap