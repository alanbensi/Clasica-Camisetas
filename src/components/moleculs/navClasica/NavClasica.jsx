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
                <div className='d-flex justify-content-between w-100'>
                    <div className='containerLogoNavbar'>
                        <Link to='/'>LOGO</Link>
                    </div>
                    <div className='containerIconosNavbar'>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='iconoHamburguesa' />
                        <NavLink to='/carrito'><Icon icon="fluent:cart-20-regular" className='iconoCarrito' /></NavLink>
                    </div>
                </div>
                <div>
                    <p className='saludoUsuario'>Hola Juan Perez!</p>
                </div>
                <Navbar.Collapse id="responsive-navbar-nav" className='navbarDesplegado'>
                    <Nav className="me-auto">
                        <div className='containerLinksNavbar'>
                            <p className='mb-2'>Bienvenido</p>
                            <div className='d-flex justify-content-evenly'>
                                <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                    <Link className='linksRouter' to='/Login'><Boton estilo = "botonNav botonAzul" texto= "Ingresá"></Boton></Link>
                                </Navbar.Toggle>
                                <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                    <Link className='linksRouter' to='/Registrate'><Boton estilo = "botonNav botonBlanco" texto = "Registrate"></Boton></Link>
                                </Navbar.Toggle>
                            </div>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/' className='d-flex estiloLinks'>
                                    <Icon icon="bytesize:home" width= '20px'/>
                                    <p className='ms-3'>Inicio</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/' className='d-flex estiloLinks'>
                                    <Icon icon="ion:shirt-outline" width= '20px' />
                                    <p className='ms-3'>Productos</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/' className='d-flex estiloLinks'>
                                    <Icon icon="ri:auction-line" width= '20px' />
                                    <p className='ms-3'>Subastas</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to='/Vende-tu-camiseta' className='d-flex estiloLinks'>
                                    <Icon icon="ep:sell" width= '20px' />
                                    <p className='ms-3'>Vende tu camiseta</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/' className='d-flex estiloLinks'>
                                    <Icon icon="ant-design:shop-outlined" width= '20px' />
                                    <p className='ms-3'>Nosotros</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/' className='d-flex estiloLinks'>
                                    <Icon icon="carbon:help" width= '20px' />
                                    <p className='ms-3'>Ayuda</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/' className='d-flex estiloLinks'>
                                    <Icon icon="codicon:account" width= '20px' />
                                    <p className='ms-3'>Mi cuenta</p>
                                </NavLink>
                            </Navbar.Toggle>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavClasica