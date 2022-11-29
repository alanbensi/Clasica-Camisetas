import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Icon } from '@iconify/react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavClasica.css';
import logoClasica from '../../../assets/LOGO-clasica.png';
import Boton from '../../atoms/boton/Boton';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';

const NavClasica = () => {

    const userContext = useContext (UserContext);
    const {userID, setToken, username, userAdmin} = userContext;

    const cartContext = useContext (CartContext); 
    const {carritoContexto}= cartContext; 

    const redirect = useNavigate();
    const cerrarSesion = ()=> {
        localStorage.removeItem ("token"); 
        setToken (""); 
        redirect("/");
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="md" className='bgNavbar'>
                <div className='navDesktop align-items-center d-flex justify-content-between w-100'>
                    <div className='containerLogoNavbar'>
                        <div className='estiloLinks'>
                            <Link to='/'>
                                <img src={logoClasica} alt="Logo clasica camisetas" />
                            </Link>
                        </div>
                    </div>
                    { userID ?
                        (
                        <div>
                            <p className='saludoUsuario'>Hola {username}!</p>
                        </div>
                        )
                        :
                        null
                    }
                    <div className='containerIconosNavbar'>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='iconoHamburguesa' />
                        <div className='estiloLinks'>
                            <Link to='/Carrito-de-compras' className='linkIconoCarrito'>
                                <Icon icon="fluent:cart-20-regular" className='iconoCarrito' />
                                <p className='contadorIconoCarrito estiloLinks'>{carritoContexto}</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <Navbar.Collapse id="responsive-navbar-nav" className='navbarDesplegado'>
                    <Nav className="me-auto">
                        <div className='containerLinksNavbar'>
                            {
                                !userID &&
                                (
                                    <div className='d-flex justify-content-evenly'>
                                        <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                            <Link className='linksRouter' to='/Login'><Boton estilo="botonNav botonAzul" texto="Ingresá"></Boton></Link>
                                        </Navbar.Toggle>
                                        <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                            <Link className='linksRouter' to='/Registrate'><Boton estilo="botonNav botonBlanco" texto="Registrate"></Boton></Link>
                                        </Navbar.Toggle>
                                    </div>
                                ) 
                            }
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/' className='d-flex estiloLinks'>
                                    <Icon icon="bytesize:home" width= '20px'/>
                                    <p className='ms-3'>Inicio</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to='/Productos/Todos los productos' className='d-flex estiloLinks'>
                                    <Icon icon="ion:shirt-outline" width='20px' />
                                    <p className='ms-3'>Productos</p>
                                </NavLink>
                            </Navbar.Toggle>
                            <div className='estiloLinks d-flex'>
                                <div className='d-flex'>
                                    <Icon icon="tabler:category" width= '20px' /> 
                                    <NavDropdown id="nav-dropdown-dark-example" title="Categorías" className='dropdownProductos ms-3 mb-3'>
                                        <Navbar.Toggle as="div" bsPrefix='estiloLinks' className='w-100'>
                                            <NavDropdown.Item className='paginasDropdownProductos'>
                                                <NavLink to='/Productos/Camisetas temporada actual' className="estiloLinks">
                                                    Camisetas temporada actual
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='paginasDropdownProductos'>
                                                <NavLink to='/Productos/Retros de coleccion' className="estiloLinks">
                                                    Retros de coleccion
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item className='paginasDropdownProductos'>
                                                <NavLink to='/Productos/Entrenamientos y salidas' className="estiloLinks">
                                                    Entrenamientos y salidas
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
                                {
                                    userAdmin? 
                                    (
                                    <>
                                        <NavLink to='/admin/usuarios' className='d-flex estiloLinks'>
                                            <Icon icon="codicon:account" width='20px' />
                                            <p className='ms-3'>Ver todos los usuarios</p>
                                        </NavLink>
                                        <NavLink to='/admin/formularioCamisetas' className='d-flex estiloLinks'>
                                            <Icon icon="carbon:add-alt" width='20px' />
                                            <p className='ms-3'>Agregar productos</p>
                                        </NavLink>
                                    </>
                                    
                                    )
                                    :
                                    (userID &&
                                    <NavLink to = { userID?(`/Mi-cuenta/${userID}`) : ('/Login')} className='d-flex estiloLinks'>
                                        <Icon icon="codicon:account" width= '20px' />
                                        <p className='ms-3'>Mi cuenta</p>
                                    </NavLink>
                                    )
                                }
                                
                            </Navbar.Toggle>
                            {
                                userID ? 
                                (
                                <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                    <Boton onClick={cerrarSesion} estilo='botonBlanco botonLogin' texto='Cerrar sesión' />
                                </Navbar.Toggle>
                                ) 
                                :
                                (false)
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavClasica