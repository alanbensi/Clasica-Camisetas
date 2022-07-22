import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Icon } from '@iconify/react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavClasica.css'
import Boton from '../../atoms/boton/Boton';

const NavClasica = () => {
    return (
        <header className='header'>
            <Navbar collapseOnSelect expand="lg" className='bgNavbar'>
                <div className='containerLogoNavbar'>
                    <Link to='/'>LOGO</Link>
                </div>
                <div className='containerIconosNavbar'>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className='iconoHamburguesa' />
                    <NavLink to='/carrito'><Icon icon="fluent:cart-20-regular" className='iconoCarrito' /></NavLink>
                </div>
                <Navbar.Collapse id="responsive-navbar-nav" className='navbarDesplegado'>
                    <Nav className="me-auto">
                        <div className='containerLinksNavbar'>
                            <p className='mb-2'>Bienvenido</p>
                            <div className='d-flex justify-content-evenly'>
                                <Link to='/'><Boton estilo = "botonNav botonAzul" texto= "Ingresá"></Boton></Link>
                                <Link to='/'><Boton estilo = "botonNav botonBlanco" texto = "Registrate"></Boton></Link>
                            </div>
                            <NavLink to ='/' className='d-flex estiloLinks'>
                                <Icon icon="bytesize:home" width= '20px'/>
                                <p className='ms-3'>Inicio</p>
                            </NavLink>
                            <NavLink to ='/' className='d-flex estiloLinks'>
                                <Icon icon="ion:shirt-outline" width= '20px' />
                                <p className='ms-3'>Productos</p>
                            </NavLink>
                            <NavLink to ='/' className='d-flex estiloLinks'>
                                <Icon icon="ri:auction-line" width= '20px' />
                                <p className='ms-3'>Subastas</p>
                            </NavLink>
                            <NavLink to='/vendeTuCamiseta' className='d-flex estiloLinks'>
                                <Icon icon="ep:sell" width= '20px' />
                                <p className='ms-3'>Vende tu camiseta</p>
                            </NavLink>
                            <NavLink to ='/' className='d-flex estiloLinks'>
                                <Icon icon="ant-design:shop-outlined" width= '20px' />
                                <p className='ms-3'>Nosotros</p>
                            </NavLink>
                            <NavLink to ='/' className='d-flex estiloLinks'>
                                <Icon icon="carbon:help" width= '20px' />
                                <p className='ms-3'>Ayuda</p>
                            </NavLink>
                            <NavLink to ='/' className='d-flex estiloLinks'>
                                <Icon icon="codicon:account" width= '20px' />
                                <p className='ms-3'>Mi cuenta</p>
                            </NavLink>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavClasica