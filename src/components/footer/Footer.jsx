import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div>
                <div className='containerFooter containerExplorarFooter'>
                    <p className='categoriasFooter'>Explorar</p>
                    <ul>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/'>Inicio</Link> </li>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/'>Categorias</Link> </li>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/subastas'>Subastas</Link> </li>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/ayuda'>Ayuda</Link> </li>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/vendeTuCamiseta'>Vende tu camiseta</Link> </li>
                    </ul>
                </div>
                <div className='containerFooter containerContactoFooter'>
                    <p className='categoriasFooter'>Contacto</p>
                    <ul>
                        <li className='listaFooter'> <a className='anchorFooter' href="tel:+54-9-1131867585">+541131867585</a> </li>
                        <li className='listaFooter'> <a className='anchorFooter' href="mailto:clasicacamisetas@gmail.com"> clasicacamisetas@gmail.com</a> </li>
                    </ul>
                </div>
                <div className='containerFooter containerPagosFooter'>
                    <p className='categoriasFooter'>Medios de pago</p>
                    <div>
                        <img className='imgMediosPagoFooter' src="" alt="Mercado pago" />
                        <img className='imgMediosPagoFooter' src="" alt="PayPal" />
                    </div>
                </div>
                <div className='containerFooter containerEnviosFooter'>
                    <p className='categoriasFooter'>Medios de envío</p>
                    <div>
                        <img className='imgMediosEnvioFooter' src="" alt="Correo Argentino" />
                    </div>
                </div>
                <div className='containerFooter containerIconosFooter'>
                    <p className='categoriasFooter'>Seguinos</p>
                    <div>
                        <Icon className='iconoRedesFooter' icon="fa-brands:instagram" color="white" width="24" />
                        <Icon className='iconoRedesFooter iconoFacebookFooter' icon="bi:facebook" color="white" width="26" />
                    </div>
                </div>
            </div> 
            <div>
                {/* LINEA CSS */}
                <div className='containerFooter containerCopyrightFooter'>
                    <p className='parrafoCopyrightFooter'>Copyright CLASICA CAMISETAS - 2022. <br /> Todos los derechos reservados.</p>
                    <p className='parrafoCopyrightFooter'>Defensa de las y los consumidores. <br /> Para reclamos <a className='' href="/">ingrese aqui</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer