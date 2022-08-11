import React from 'react'
import './Login.css'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Boton from '../../atoms/boton/Boton';

const Login = () => {

    const [tipoInput, settipoInput] = useState("password");
    const mostrarContraseña = ()=> {
        if (tipoInput==="password") {
            settipoInput ("text") 
        }
        else {
            settipoInput ("password")
        }
    };

    return (
        <>
            <main className='mainLogin'>
                <h1 className='tituloLogin'>BIENVENIDO</h1>
                <h2 className='subtituloLogin'>Ingresá a tu cuenta</h2>
                <section>
                    <form action="" method="post">
                        <input className='inputLogin' type="email" placeholder='Ingresá tu email...'/>
                        <div className='containerInputPassword'>
                            <input className='inputLogin inputPassword' type={tipoInput} placeholder='Ingresá tu contraseña...' />
                            <Icon onClick={mostrarContraseña} icon= "clarity:eye-line" className='iconoOjo' />
                        </div>
                        <Link to='/Restablecer-Contrasena' className='linkContraseñaOlvidada'>¿Olvidaste tu contraseña?</Link>
                        <Boton estilo= 'botonAzul botonLogin' texto = 'Ingresá' />
                    </form>
                    <div>
                        <p className='textoCentrado'>¿No tenés una cuenta? <Link to='/Registrate' className='linkRegistro'>Registrate ahora</Link></p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login