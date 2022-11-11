import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import './Footer.css'
import iconoMP from '../../../assets/LOGO Mercado-Pago.png'
import iconoPayPal from '../../../assets/LOGO Paypal.png'
import iconoCorreoArg from '../../../assets/LOGO Correo Argentino.jpg'

const Footer = () => {
    return (
        <footer>
            <div className='contenedorGeneralFooter'>
                <div className='containerFooter containerExplorarFooter'>
                    <p className='categoriasFooter'>Explorar</p>
                    <ul>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/'>Inicio</Link> </li>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/'>Productos</Link> </li>
                        <li className='listaFooter anchorFooter'>
                            Categorías:
                            <ul>
                                <li className='testAlan'> 
                                    <Link className='anchorFooter' to='/Productos/Camisetas temporada actual'>Camisetas temporada actual
                                    </Link> 
                                </li>
                                <li className='listaFooter testAlan'>
                                    <Link className='anchorFooter' to='/Productos/Retros de coleccion'>Retros de coleccion
                                    </Link>
                                </li>
                                <li className='listaFooter testAlan'>
                                    <Link className='anchorFooter' to='/Productos/Entrenamientos y salidas'>Entrenamientos y salidas
                                    </Link>
                                </li>
                                <li className='listaFooter'> <Link className='anchorFooter' to='/Subastas'>Subastas</Link> </li>
                            </ul>
                        </li>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/Ayuda'>Ayuda</Link> </li>
                        <li className='listaFooter'> <Link className='anchorFooter' to='/Vende-tu-camiseta'>Vende tu camiseta</Link> </li>
                    </ul>
                </div>
                <div className='containerFooter containerContactoFooter'>
                    <p className='categoriasFooter'>Contacto</p>
                    <ul>
                        <li className='listaFooter'><a className='anchorFooter' href="tel:+54-9-1131867585">+541131867585</a> </li>
                        <li className='listaFooter'><a className='anchorFooter' href="mailto:clasicacamisetas@gmail.com"> clasicacamisetas@gmail.com</a> </li>
                    </ul>
                </div>
                <div className='containerFooter containerPagosFooter'>
                    <p className='categoriasFooter'>Medios de pago</p>
                    <div>
                        <img className='imgMediosPagoFooter logoMP' src={iconoMP} alt="Mercado pago" />
                        <img className='imgMediosPagoFooter logoPayPal' src={iconoPayPal} alt="PayPal" />
                    </div>
                </div>
                <div className='containerFooter containerEnviosFooter'>
                    <p className='categoriasFooter'>Medios de envío</p>
                    <div>
                        <img className='imgMediosEnvioFooter logoCorreoArg' src={iconoCorreoArg} alt="Correo Argentino" />
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
                <div className='containerFooter containerCopyrightFooter'>
                    <p className='parrafoCopyrightFooter'>Copyright CLASICA CAMISETAS - 2022. <br /> Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer