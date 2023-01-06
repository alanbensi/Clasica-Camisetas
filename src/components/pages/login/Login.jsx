import React, { useContext } from 'react'
import './Login.css'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../../atoms/boton/Boton';
import { UserContext } from '../../context/UserContext';

const Login = () => {

    const userContext = useContext (UserContext);
    const {setToken} = userContext;

    const [error, seterror] = useState(false)
    const [tipoInput, settipoInput] = useState("password");
    const [emailValue, setEmailValue] = useState('');

    const handleBlurEmail = (value) =>{
        setEmailValue(value);
    }

    const [passwordValue, setPasswordValue] = useState ('');

    const handleBlurPassword = (value) => {
        setPasswordValue (value);
    }

    const mostrarContraseña = ()=> {
        if (tipoInput==="password") {
            settipoInput ("text") 
        }
        else {
            settipoInput ("password")
        }
    };

    const fetchOptions={ 
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    };

    const redirect = useNavigate ();

    const usuarioLogueado = (token)=> {
        setToken(token); 
        localStorage.setItem ("token", token);
        redirect ("/");
    }

    const handleClick = () => {
        fetch('${process.env.URL}/login', fetchOptions)
            .then(res => res.json())
            .then(res => res.error ? seterror(true) : usuarioLogueado(res.token));
    };

    return (
        <>
            <main className='mainLogin'>
                <h1 className='tituloLogin'>BIENVENIDO</h1>
                <h2 className='subtituloLogin'>Ingresá a tu cuenta</h2>
                {
                    error && <p className='mensajeError mt-1'>Los datos ingresados no son correctos.</p>
                }
                <section>
                    <form action="" method="post">
                        <input className='inputLogin' type="email" placeholder='Ingresá tu email...' onBlur={(e)=> handleBlurEmail(e.target.value)}/>
                        <div className='containerInputPassword'>
                            <input className='inputLogin inputPassword' type={tipoInput} placeholder='Ingresá tu contraseña...' onBlur={(e) => handleBlurPassword(e.target.value)} />
                            <Icon onClick={mostrarContraseña} icon= "clarity:eye-line" className='iconoOjo' />
                        </div>
                        <Link to='/Restablecer-Contrasena' className='linkContraseñaOlvidada'>¿Olvidaste tu contraseña?</Link>
                        <Boton estilo= 'botonAzul botonLogin' texto = 'Ingresá' onClick={handleClick} />
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