import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Boton from '../../atoms/boton/Boton'
import { useState } from 'react'
import './NuevaContrasena.css'
import { useForm } from "react-hook-form"

const NuevaContrasena = () => {
    const [tipoInput, settipoInput] = useState("password");
    const mostrarContraseña = () => {
        if (tipoInput === "password") {
            settipoInput("text");
        }
        else {
            settipoInput("password");
        }
    };

    const [tipoInput2, settipoInput2] = useState("password");
    const mostrarContraseña2 = () => {
        if (tipoInput2 === "password") {
            settipoInput2("text");
        }
        else {
            settipoInput2("password");
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
                    <h1 className='tituloNuevaContraseña'>Restablecer contraseña</h1>
                    <h2 className='subtituloNuevaContraseña'>Por favor ingresa tu nueva contraseña y confirma para continuar</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput} placeholder='Contraseña'  {...register("nuevaContraseña")} />
                            <Icon onClick={mostrarContraseña} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput2} placeholder='Repetir contraseña' {...register("repetirNuevaContraseña")} />
                            <Icon onClick={mostrarContraseña2} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <Boton estilo='botonAzul botonLogin mt-4' onClick={handleSubmit(onSubmit)} texto='Continuar'/>
                    </form>
                </section>
            </main>
        </>

    )
}

export default NuevaContrasena