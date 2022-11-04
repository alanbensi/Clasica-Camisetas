import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Boton from '../../atoms/boton/Boton'
import { useState } from 'react'
import './LoginNuevaContrasena.css'
import { useForm } from "react-hook-form"


const LoginNuevaContraseña = () => {

    const [tipoInput, settipoInput] = useState("password");
    const mostrarContraseña = () => {
        if (tipoInput === "password") {
            settipoInput("text");
        }
        else {
            settipoInput("password");
        }
    };

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <main className='p-3'>
                <section>
                    <h1 className='tituloLoginNuevaContra'>Contraseña creada</h1>
                    <h2 className='subtituloLoginNuevaContra'>Ingresá a tu cuenta</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='inputLogin' type="email" placeholder='Ingresá tu email...' {...register("mailUsuario")} />
                        <div className='containerInputPassword'>
                            <input className='inputLogin inputPassword mb-3' type={tipoInput} placeholder='Ingresá tu contraseña...' {...register("contraseñaNuevaUsuario")}/>
                            <Icon onClick={mostrarContraseña} icon="clarity:eye-line" className='iconoOjo iconoLoginNuevaContra' />
                        </div>
                        <Link to='/Restablecer-Contrasena' className='linkContraseñaOlvidada'>¿Olvidaste tu contraseña?</Link>
                        <Boton estilo='botonAzul botonLogin mt-3' texto='Ingresá' onClick={handleSubmit(onSubmit)} />
                    </form>
                </section>
            </main>
        </>
    )
}

export default LoginNuevaContraseña