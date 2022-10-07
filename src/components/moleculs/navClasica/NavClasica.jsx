import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Icon } from '@iconify/react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavClasica.css'
import logoClasica from '../../../assets/LOGO-clasica.png'
import Boton from '../../atoms/boton/Boton';

const NavClasica = () => {

    const token = true; 

    return (
        <header>
            <Navbar collapseOnSelect expand="md" className='bgNavbar'>
                <div className='navDesktop d-flex justify-content-between w-100'>
                    <div className='containerLogoNavbar'>
                        <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                            <Link to='/'>
                                <img src={logoClasica} alt="Logo clasica camisetas" />
                            </Link>
                        </Navbar.Toggle>
                    </div>
                    <div className='containerIconosNavbar'>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='iconoHamburguesa' />
                        <Navbar.Toggle as="div" bsPrefix='estiloLinks' className='linkIconoCarritoActive'>
                            <Link to='/Carrito-de-compras' className='linkIconoCarrito'><Icon icon="fluent:cart-20-regular" className='iconoCarrito' /></Link>
                        </Navbar.Toggle>
                    </div>
                </div>
                {/* <div>
                    <p className='saludoUsuario'>Hola Juan Perez!</p>
                </div> */}
                <Navbar.Collapse id="responsive-navbar-nav" className='navbarDesplegado'>
                    <Nav className="me-auto">
                        <div className='containerLinksNavbar'>
                            {/* <p className='mb-2'>Bienvenido</p> */}
                            <div className='puto d-flex justify-content-evenly'>
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
                            <div className='estiloLinks d-flex'>
                                <div className='d-flex'>
                                    <Icon icon="ion:shirt-outline" width= '20px' /> 
                                    <NavDropdown id="nav-dropdown-dark-example" title="Productos" className='dropdownProductos ms-3 mb-3'>
                                        <Navbar.Toggle as="div" bsPrefix='estiloLinks' className='w-100'>
                                            <NavDropdown.Item className='paginasDropdownProductos'>
                                                <NavLink to='/Productos/Temporada-actual' className="estiloLinks">
                                                    Camisetas temporada actual
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='paginasDropdownProductos'>
                                                <NavLink to='/Productos/Retro-de-coleccion' className="estiloLinks">
                                                    Retros de coleccion
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='paginasDropdownProductos'>
                                                <NavLink to='/Productos/Otros-equipos' className="estiloLinks">
                                                    Otros equipos
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='paginasDropdownProductos'>
                                                <NavLink to='/Productos/Entrenamiento-y-salidas' className="estiloLinks">
                                                    Entrenamiento y salidas
                                                </NavLink>
                                            </NavDropdown.Item>
                                        </Navbar.Toggle>
                                    </NavDropdown>
                                </div>
                            </div>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/Subastas' className='d-flex estiloLinks'>
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
                                <NavLink to ='/Ayuda' className='d-flex estiloLinks'>
                                    <Icon icon="carbon:help" width= '20px' />
                                    <p className='ms-3'>Ayuda</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to={token?('/Login'):('/Mi-cuenta')} className='d-flex estiloLinks'>
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