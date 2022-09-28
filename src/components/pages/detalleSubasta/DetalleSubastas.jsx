import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DetalleSubastas.css';
import CardsSubastas from '../../atoms/cardsSubastas/CardsSubastas';
import Boton from '../../atoms/boton/Boton'
import { Button, Modal } from 'react-bootstrap';

const DetalleSubastas = () => {
    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);

    const ofertaUsuarioEsMaxima = true;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <main className='px-3'>
            <section className='d-flex mt-2 mb-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <Link className='breadcrumb ms-1' to='/Subastas'>Subastas {'>'}</Link>
                <p className='ms-1'>{titulo}</p>
            </section>
            <section>
                <h1 className='tituloDetalleSubastas'>Camiseta Lorem ipsum, dolor sit amet</h1>
                <CardsSubastas imgSubasta='adfsdf' />
                {ofertaUsuarioEsMaxima && <h3 className='pb-4'>TENÉS LA OFERTA MÁS ALTA</h3>}
                <div>
                    <Button className='verOfertasSubastas' onClick={handleShow}>
                        VER TODAS LAS OFERTAS
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton />
                        <Modal.Body>ACA VA EL LISTADO DE LAS OFERTAS PREVIAS.</Modal.Body>
                    </Modal>
                </div>
                <div className='mt-2'>
                    <p>Siguiente oferta mínima: USD "OFERTA * 0.10"</p>
                </div>
                <div>
                    <Link className='verOfertasSubastas estiloLinks' to="/">HACER UNA OFERTA</Link>
                </div>
                <div className='containerDescripcionSubastas'>
                    <h2 className='subtituloDetalleSubastas'>DESCRIPCIÓN</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut maiores commodi fugit nulla, voluptatibus inventore obcaecati numquam incidunt provident officia veritatis voluptates earum voluptatum itaque minima aliquid hic amet sint.</p>
                    <div>
                        <table className='tablaDescripcionSubasta'>
                            <tr>
                                <td>EQUIPO</td>
                                <td>Info dinamica</td>                                  
                            </tr>
                            <tr>
                                <td>OBJETO</td>
                                <td>Info dinamica</td>
                            </tr>
                            <tr>
                                <td>DEPORTISTA</td>
                                <td>Info dinamica</td>
                            </tr>
                            <tr>
                                <td>ESTADO</td>
                                <td>Info dinamica</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='containerBotonHacerOferta'>
                    <Link className='estiloLinks' to="/">
                        <Boton texto="Hacer una oferta" estilo="botonAzul botonLogin" />
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default DetalleSubastas