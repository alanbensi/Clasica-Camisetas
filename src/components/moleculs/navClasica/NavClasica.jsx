import React, { useContext, useEffect, useState } from 'react';
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
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import styled from 'styled-components';
import {SwitchDivisaContext} from '../../context/SwitchDivisaContext';


const NavClasica = () => {

    const userContext = useContext (UserContext);
    const {userID, setToken, username, userAdmin} = userContext;

    const cartContext = useContext (CartContext); 
    const {carritoContexto}= cartContext; 

    const switchDivisa = useContext (SwitchDivisaContext);
    const { switchDivisaContexto, setSwitchDivisaContexto} = switchDivisa; 

    const redirect = useNavigate();
    const cerrarSesion = ()=> {
        localStorage.removeItem ("token"); 
        setToken (""); 
        redirect("/");
    }


    const [moneda, setMoneda] = useState(false); 
    useEffect(() => {
        setSwitchDivisaContexto(moneda)
    }, [])

    useEffect(() => {
        setSwitchDivisaContexto(moneda)
    }, [moneda])
    
    const handleChange = (e) => {
        setMoneda (e.target.checked);
    }


    const MaterialUISwitch = styled(Switch)(() => ({
        width: 62,
        height: 34,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            margin: 6,
            padding: 0,
            transform: 'translateX(2px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"%3E%3Cpath fill="%23ed4c5c" d="M48 6.6C43.3 3.7 37.9 2 32 2v4.6h16"%2F%3E%3Cpath fill="%23fff" d="M32 11.2h21.6C51.9 9.5 50 7.9 48 6.6H32v4.6z"%2F%3E%3Cpath fill="%23ed4c5c" d="M32 15.8h25.3c-1.1-1.7-2.3-3.2-3.6-4.6H32v4.6z"%2F%3E%3Cpath fill="%23fff" d="M32 20.4h27.7c-.7-1.6-1.5-3.2-2.4-4.6H32v4.6"%2F%3E%3Cpath fill="%23ed4c5c" d="M32 25h29.2c-.4-1.6-.9-3.1-1.5-4.6H32V25z"%2F%3E%3Cpath fill="%23fff" d="M32 29.7h29.9c-.1-1.6-.4-3.1-.7-4.6H32v4.6"%2F%3E%3Cpath fill="%23ed4c5c" d="M61.9 29.7H32V32H2c0 .8 0 1.5.1 2.3h59.8c.1-.8.1-1.5.1-2.3c0-.8 0-1.6-.1-2.3"%2F%3E%3Cpath fill="%23fff" d="M2.8 38.9h58.4c.4-1.5.6-3 .7-4.6H2.1c.1 1.5.3 3.1.7 4.6"%2F%3E%3Cpath fill="%23ed4c5c" d="M4.3 43.5h55.4c.6-1.5 1.1-3 1.5-4.6H2.8c.4 1.6.9 3.1 1.5 4.6"%2F%3E%3Cpath fill="%23fff" d="M6.7 48.1h50.6c.9-1.5 1.7-3 2.4-4.6H4.3c.7 1.6 1.5 3.1 2.4 4.6"%2F%3E%3Cpath fill="%23ed4c5c" d="M10.3 52.7h43.4c1.3-1.4 2.6-3 3.6-4.6H6.7c1 1.7 2.3 3.2 3.6 4.6"%2F%3E%3Cpath fill="%23fff" d="M15.9 57.3h32.2c2.1-1.3 3.9-2.9 5.6-4.6H10.3c1.7 1.8 3.6 3.3 5.6 4.6"%2F%3E%3Cpath fill="%23ed4c5c" d="M32 62c5.9 0 11.4-1.7 16.1-4.7H15.9c4.7 3 10.2 4.7 16.1 4.7"%2F%3E%3Cpath fill="%23428bc1" d="M16 6.6c-2.1 1.3-4 2.9-5.7 4.6c-1.4 1.4-2.6 3-3.6 4.6c-.9 1.5-1.8 3-2.4 4.6c-.6 1.5-1.1 3-1.5 4.6c-.4 1.5-.6 3-.7 4.6c-.1.8-.1 1.6-.1 2.4h30V2c-5.9 0-11.3 1.7-16 4.6"%2F%3E%3Cpath fill="%23fff" d="m25 3l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm20 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H15l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm12 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm2.8-14l1.2-.9l1.2.9l-.5-1.5l1.2-1h-1.5L13 9l-.5 1.5h-1.4l1.2.9l-.5 1.6m-8 12l1.2-.9l1.2.9l-.5-1.5l1.2-1H5.5L5 21l-.5 1.5h-1c0 .1-.1.2-.1.3l.8.6l-.4 1.6"%2F%3E%3C%2Fsvg%3E')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor:'#BF0D3E',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor:'#fff',
            width: 25,
            height: 25,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"%3E%3Cpath fill="%23f9f9f9" d="M2 32c0 5.9 1.7 11.4 4.6 16h50.7c2.9-4.6 4.6-10.1 4.6-16s-1.7-11.4-4.6-16H6.6C3.7 20.6 2 26.1 2 32z"%2F%3E%3Cpath fill="%23b4d7ee" d="M57.4 16C52.1 7.6 42.7 2 32 2S11.9 7.6 6.6 16h50.8zM6.6 48c5.3 8.4 14.7 14 25.4 14s20.1-5.6 25.4-14H6.6z"%2F%3E%3Cpath fill="%23f6b40e" d="m45.7 31.8l-8.2-.3v-.1c1.3-.2 2.3-1 3.7-.9c1.7.2 2.7-.8 3.3-1c.7-.2 1.1.2 1.1 0c.1-.2-.4-.6-1.4-.5c-.9.1-1.2.9-3.3.7c-1.8-.1-2.4.6-3.7.6v-.1l7.4-3.4s.2-.1.2-.3c-.1-.2-.3-.1-.3-.1l-7.5 3v-.1c1.1-.7 1.7-1.8 3.1-2.2c1.6-.5 2.2-1.7 2.7-2.2c.5-.5 1.1-.2 1.1-.4s-.6-.4-1.4.1c-.8.5-.8 1.3-2.8 1.9c-1.7.5-2 1.4-3.2 2l-.1-.1l5.6-6s.2-.2.1-.3c-.1-.1-.3.1-.3.1l-6 5.6l-.1-.1c.8-1.1.9-2.3 2-3.2c1.3-1.1 1.3-2.4 1.6-3c.3-.6.9-.6.8-.8s-.7-.1-1.3.6c-.6.8-.3 1.5-1.8 2.8c-1.3 1.1-1.3 2.1-2.1 3c0 0-.1 0-.1-.1l2.8-7.7s.1-.2-.1-.3c-.2-.1-.3.2-.3.2l-3.4 7.4h-.1c.3-1.3 0-2.5.6-3.7c.8-1.5.3-2.8.3-3.4c.1-.7.6-.9.5-1c-.1-.2-.7.2-1 1.1c-.2.9.3 1.5-.6 3.3c-.8 1.6-.4 2.4-.8 3.6h-.1l-.3-8.2s0-.3-.2-.3s-.2.3-.2.3l-.3 8.2h-.1c-.2-1.3-1-2.3-.9-3.7c.2-1.7-.8-2.7-1-3.3s.2-1.1 0-1.1c-.2-.1-.6.4-.5 1.4c.1.9.9 1.2.7 3.3c-.1 1.8.6 2.4.6 3.7h-.1l-3.4-7.4s-.1-.2-.3-.2c-.2.1-.1.3-.1.3l2.8 7.7h-.1c-.7-1.1-1.8-1.7-2.2-3.1c-.5-1.6-1.7-2.2-2.2-2.7c-.5-.5-.2-1.1-.4-1.1s-.4.6.1 1.4s1.3.8 1.9 2.8c.5 1.7 1.4 2 2 3.2l-.1.1l-6-5.6s-.2-.2-.3-.1c-.1.1.1.3.1.3l5.6 6l-.1.1c-1.1-.8-2.3-.9-3.2-2c-1.1-1.3-2.4-1.3-3-1.6c-.6-.3-.6-.9-.8-.8c-.2.1-.1.7.6 1.3c.8.6 1.5.3 2.8 1.8c1.1 1.3 2.1 1.3 3 2.1c0 0 0 .1-.1.1l-7.7-2.8s-.2-.1-.3.1c-.1.2.2.3.2.3l7.4 3.4v.1c-1.3-.3-2.5 0-3.7-.6c-1.5-.8-2.8-.3-3.4-.3c-.7-.1-.9-.6-1-.5c-.2.1.2.7 1.1 1c.9.2 1.5-.3 3.3.6c1.6.8 2.4.4 3.6.8v.1l-8.2.3s-.3 0-.3.2s.3.2.3.2l8.2.3v.1c-1.3.2-2.3 1-3.7.9c-1.7-.2-2.7.8-3.3 1c-.7.2-1.1-.2-1.1 0c-.1.2.4.6 1.4.5s1.2-.8 3.3-.7c1.8.1 2.4-.6 3.7-.6v.1l-7.4 3.4s-.2.1-.2.3s.3.1.3.1l7.7-2.8v.1c-1.1.7-1.7 1.8-3.1 2.2c-1.6.5-2.2 1.7-2.7 2.2c-.5.5-1.1.2-1.1.4s.6.4 1.4-.1c.8-.5.8-1.3 2.8-1.9c1.7-.5 2-1.4 3.2-2l.1.1l-5.6 6s-.2.2-.1.3c.1.1.3-.1.3-.1l6-5.6l.1.1c-.8 1.1-.9 2.3-2 3.2c-1.3 1.1-1.3 2.4-1.6 3c-.3.6-.9.6-.8.8c.1.2.7.1 1.3-.6s.3-1.5 1.8-2.8c1.3-1.1 1.3-2.1 2.1-3c0 0 .1 0 .1.1L26.5 45s-.1.2.1.3c.2.1.3-.2.3-.2l3.4-7.4h.1c-.3 1.3 0 2.5-.6 3.7c-.8 1.5-.3 2.8-.4 3.4c-.1.7-.6.9-.5 1c.1.2.7-.2 1-1.1c.2-.9-.3-1.4.6-3.3c.8-1.6.4-2.4.8-3.6h.1l.3 8.2s0 .3.2.3s.2-.3.2-.3l.3-8.2h.1c.2 1.3 1 2.3.9 3.7c-.2 1.7.8 2.7 1 3.3c.2.7-.2 1.1 0 1.1c.2.1.6-.4.5-1.4c-.1-.9-.9-1.2-.7-3.3c.1-1.8-.6-2.4-.6-3.7h.1l3.4 7.4s.1.2.3.2c.2-.1.1-.3.1-.3L34.6 37h.1c.7 1.1 1.8 1.7 2.2 3.1c.5 1.6 1.7 2.2 2.2 2.7c.5.5.2 1.1.4 1.1s.4-.6-.1-1.4c-.5-.8-1.3-.8-1.9-2.8c-.5-1.7-1.4-2-2-3.2l.1-.1l6 5.6s.2.2.3.1c.1-.1-.1-.3-.1-.3l-5.6-6l.1-.1c1.1.8 2.3.9 3.2 2c1.1 1.3 2.4 1.3 3 1.6c.6.3.6.9.8.8c.2-.1.1-.7-.6-1.3c-.8-.6-1.5-.3-2.8-1.8c-1.1-1.3-2.1-1.3-3-2.2c0 0 0-.1.1-.1l7.7 2.8s.2.1.3-.1c.1-.2-.2-.3-.2-.3l-7.4-3.4v-.1c1.3.3 2.5 0 3.7.6c1.5.8 2.8.3 3.4.3c.7.1.9.6 1 .5c.2-.1-.2-.7-1.1-1c-.9-.2-1.5.3-3.3-.6c-1.6-.8-2.4-.4-3.6-.8v-.1l8.2-.3s.3 0 .3-.2s-.3-.2-.3-.2"%2F%3E%3Cg fill="%2385340a"%3E%3Cpath d="M35 31.3c-.3-.3-.7-.5-1.1-.5c-.4 0-.7.2-1 .5c.5.4 1.4.4 2.1 0m-.3-.1c-.2.2-.4.3-.6.3c.1-.1.2-.2.2-.3c0-.1-.1-.2-.2-.3c.3.1.5.2.6.3m-1.1-.3c-.1.1-.1.2-.1.3c0 .1.1.3.2.3c-.2 0-.4-.1-.6-.3c.2-.1.3-.2.5-.3"%2F%3E%3Cpath d="M34 30.5c-.6 0-.7.1-.9.3c-.3.2-.4.2-.4.2s0 .2.1.1c.1 0 .3-.1.5-.3c.3-.2.5-.2.8-.2c.8 0 1.2.6 1.3.6s-.6-.7-1.4-.7"%2F%3E%3Cpath d="M32.3 30.4c-.1.2-.1.3-.1.5c-.1.6 0 1.3.4 2c0 0 .1-.1.2-.1c-.4-.5-.5-1.1-.5-1.6c0-.3.2-.5.3-.7c.7-.6 1.9-.5 2.9.3c-.9-1.3-2.2-1.2-3.2-.4"%2F%3E%3Cpath d="M33.3 31.7c-.3-.2-.4-.3-.5-.3s-.1.1.3.3s1.2.3 1.9-.3c-.8.4-1.4.4-1.7.3m-.5 1.6c-.1 0-.2-.1-.3-.2c0 .1-.2.3-.5.3s-.5-.3-.5-.3c0 .1-.1.2-.3.2c-.1 0-.3-.1-.3-.3c0-.1.1-.2.2-.2c-.2 0-.3.2-.3.4s.2.4.4.4c.1 0 .2-.1.3-.2c.1.1.4.1.5.1h.1c.1 0 .3 0 .5-.1c.1.1.2.2.3.2c.2 0 .4-.2.4-.4s-.1-.3-.3-.4c.1 0 .2.1.2.2c-.1.2-.2.3-.4.3m-.8.9c.2 0 .4-.2.7 0s.5.3.7.4c-.4-.3-.6-.6-1-.6c-.1 0-.3 0-.4.1c-.2-.1-.3-.1-.4-.1c-.4 0-.6.4-1 .6c.2-.1.4-.3.7-.4s.5 0 .7 0"%2F%3E%3Cpath d="M32 34.5c-.2 0-.3-.1-.6 0c-.2 0-.4 0-.7.1h-.1c.9.1.5.6 1.4.6c.9 0 .5-.5 1.4-.6h-.2c-.8-.3-.9-.1-1.2-.1m0 .5c-.7 0-.5-.5-1.3-.5c.8-.2.9.1 1.3.1c.3 0 .5-.2 1.3-.1c-.8.1-.6.5-1.3.5m0 .2c-.4 0-.8.3-.8.8c.1-.4.4-.6.8-.6s.7.3.8.6c0-.5-.4-.8-.8-.8m-.6-4.7c.2.2.3.5.3.7c.1.5-.1 1-.5 1.6c0 0 .1 0 .2.1c.3-.7.5-1.3.4-2c0-.2-.1-.3-.1-.5c-.9-.8-2.2-.9-3.2.4c1-.9 2.3-1 2.9-.3"%2F%3E%3Cpath d="M30.8 30.9c.3.2.4.3.5.3c.1 0 .1-.1.1-.1s-.2 0-.4-.2c-.3-.2-.4-.3-.9-.3c-.9 0-1.4.7-1.3.7c.1 0 .5-.6 1.3-.6c.2 0 .5 0 .7.2"%2F%3E%3Cpath d="M29.1 31.3c.2.2.6.3 1 .3c.3 0 .7-.1 1-.3c-.3-.3-.7-.5-1.1-.5c-.3 0-.7.2-.9.5m.2 0c.2-.2.4-.4.6-.4c-.1.1-.2.2-.2.3c0 .2.1.3.2.3c-.2.1-.5 0-.6-.2m1.5-.1c-.1.1-.3.2-.5.3c.1-.1.1-.2.1-.3c0-.1-.1-.2-.1-.3c.3.1.5.2.5.3"%2F%3E%3Cpath d="M31.3 31.4c-.1 0-.2.1-.5.3s-.9.2-1.7-.2c.7.6 1.5.5 1.9.3c.4-.3.4-.4.3-.4"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#75AADB',
            borderRadius: 20 / 2,
        },
    }));

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
                            <FormGroup className='switchNav'>
                                <p className='switchTexto'><span>Divisa: </span>$</p>
                                <FormControlLabel className='m-0' control={<MaterialUISwitch onChange={handleChange} checked={moneda} className='m-0' sx={{ m: 1 }}  />} labelPlacement='top' />
                                <p className='switchTexto'>  USD</p>
                            </FormGroup>
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
                            {/* <Navbar.Toggle as="div" bsPrefix='estiloLinks'>
                                <NavLink to ='/Subastas' className='d-flex estiloLinks'>
                                    <Icon icon="ri:auction-line" width= '20px' />
                                    <p className='ms-3'>Subastas</p>
                                </NavLink>
                            </Navbar.Toggle> */}
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
                                        {/* <NavLink to='/Subastas' className='d-flex estiloLinks'>
                                            <Icon icon="carbon:add-alt" width='20px' />
                                            <p className='ms-3'>Agregar subastas</p>
                                        </NavLink> */}
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