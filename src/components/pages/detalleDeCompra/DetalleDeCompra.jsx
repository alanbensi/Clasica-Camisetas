import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DetalleDeCompra.css'
import iconoMP from '../../../assets/LOGO Mercado-Pago.png'
import Boton from '../../atoms/boton/Boton'

const DetalleDeCompra = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [envio, setEnvio] = useState("");
    const envioDomicilio = (e) => {
        setEnvio (e.target.value);
    } 

    return (
        <main>
            <section>
                <Button className='botonModal' onClick={handleShow}>
                    Ver detalles del pedido
                    <Icon className='iconoArrowModal' icon="dashicons:arrow-down" />
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton />
                    <Modal.Body>ACA VAN LAS CARDS DE LAS CAMISETAS DEL CARRITO.</Modal.Body>
                </Modal>
            </section>
            <section className='mx-3'>
                <div>
                    <h1 className='tituloDetallesCompra mb-3'>Detalles de facturación</h1>
                    <h2 className='fontSizeDetalleCompra subtituloDetallesCompra'>Completá con tus datos para ver las opciones de envío.</h2>
                    <p className='fontSizeDetalleCompra'>(*) Estos datos son obligatorios</p>
                </div>
                <div>
                    <form action="" className='formularioDetalleCompra'>
                        <label htmlFor="nombreDetallePedido">NOMBRE *</label>
                        <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu nombre...' />
                        <label htmlFor="apellidosDetallePedido">APELLIDOS *</label>
                        <input required type="text" name="apellidosetallePedido" id="apellidosDetallePedido" placeholder='Ingresá tus apellidos...' />
                        <label htmlFor="correoDetallePedido">CORREO ELECTRÓNICO *</label>
                        <input required type="text" name="correoDetallePedido" id="correoDetallePedido" placeholder='Ingresá tu correo electrónico...'/>
                        <label htmlFor="telefonoDetallePedido">TELEFONO *</label>
                        <input required type="text" name="telefonoDetallePedido" id="telefonoDetallePedido" placeholder='Ingresá tu número de teléfono...'/>
                        <label htmlFor="dniDetallePedido">DNI *</label>
                        <input required type="text" name="dniDetallePedido" id="dniDetallePedido" placeholder='Ingresá tu número de DNI...'/>
                        <label htmlFor="cpDetallePedido">CODIGO POSTAL *</label>
                        <input required type="text" name="cpDetallePedido" id="cpDetallePedido" placeholder='Ingresá tu número de CP...'/>
                        <label htmlFor="envioDetallePedido">ENVIO *</label>
                        <div className='d-flex align-items-center'>
                            <input required className='radioDetallePedido me-3' type="radio" value="Domicilio" name="envioDetallePedido" id="envioDomicilio" onChange={envioDomicilio} />
                            Envío a domicilio    
                        </div>
                        <div>
                            <input required className='radioDetallePedido me-3' type="radio" value="Retiro en sucursal de correo argentino" name="envioDetallePedido" id="envioCorreoArgentino" onChange={envioDomicilio} />
                            Retiro en sucursal de Correo Argentino
                        </div>
                        <div className='mb-3'>
                            <input required className='radioDetallePedido me-3' type="radio" value="Retiro en punto de entrega" name="envioDetallePedido" id="retiro" onChange={envioDomicilio}/>
                            Retiro en punto de entrega
                        </div>
                        {envio === "Domicilio" && 
                        <div className='contenedorEnvioDomicilio'>
                            <h2 className='tituloDetallesCompra mb-3'>Envío a domicilio</h2>
                            <label htmlFor="nombreDetallePedido">DIRECCIÓN *</label>
                            <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu dirección...' />
                            <label htmlFor="nombreDetallePedido">CIUDAD *</label>
                            <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu ciudad...'/>
                            <label htmlFor="nombreDetallePedido">PROVINCIA *</label>
                            <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu provincia...'/>
                        </div>
                        }
                    </form>
                    <div>
                        <h2 className='tituloResumenPedido'>Resumen del pedido</h2>
                        <div className='containerResumenPedido'>
                            <div>
                                <p>PRODUCTOS</p>
                                <p>ACA VA CAMISETA.TITULO</p>
                                <p>ACA VA CAMISETA.TITULO</p>
                                <p>TOTAL</p>
                            </div>
                            <div>
                                <p>SUBTOTAL</p>
                                <p>$22000</p>
                                <p>$15786</p>
                                <p>$21118</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className='tituloMercadoPago'>Método de pago</h2>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <input className='me-2 inputCheckboxMP' type="checkbox" name="mercadoPago" id="mercadoPago" />
                                <label htmlFor="MercadoPago">Mercado pago</label>
                            </div>
                            <img className='logoMercadoPago' src={iconoMP} alt="Mercado pago" />
                        </div>
                        
                    </div>
                </div>
            </section>
            <section className='containerMercadoPagoCompra'>
                <div className='containerIconosMP'>
                    <Icon className='iconosDetalleCompra' icon="iconoir:select-window"></Icon>
                    <Icon className='flechaMP' icon="bi:arrow-right" />
                    <Icon className='iconosDetalleCompra' icon="arcticons:mercado-libre"></Icon>
                </div>
                <p className='textoMPDetalle'>Te llevamos a nuestro sitio para completar el pago</p>
            </section>
            <section className='mx-3'>
                <p className='textoTerminosCondiciones'>Al continuar, aceptas nuestros <a className='terminosCondiciones' href="">Términos y Condiciones</a></p>
                <Boton estilo="botonNav botonAzul botonDetalleCompra" texto ="Realizar el pedido"></Boton>
                <p>Sus datos personales se utilizarán para procesar su pedido y respaldar su experiencia en este sitio web.</p>
            </section>
        </main>
    )
}

export default DetalleDeCompra