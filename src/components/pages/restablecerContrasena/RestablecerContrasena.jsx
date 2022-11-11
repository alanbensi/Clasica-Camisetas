import React, { useRef } from 'react';
import Boton from '../../atoms/boton/Boton';
import './RestablecerContrasena.css';
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

const RestablecerContrasena = () => {

    const { register, errors, handleSubmit } = useForm();

    const form = useRef();

    const onSubmit = (data) => {
        emailjs.sendForm('service_2js9xx4', 'template_ayfrgkg', form.current, '_fPCF5WRlSA7ka0GU')
        .then((result) => {
            swal({
                title: "Acción completada",
                text: "Te enviamos un email para recuperar la contraseña. Por favor revisá tu bandeja de entrada y seguí las instrucciones indicadas",
                icon: "success",
            });
            console.log(result.text);
        }, (error) => {
            swal({
                title: "Ocurrio un error",
                text: "El mail no pudo enviarse correctamente, por favor intentalo nuevamente.",
                icon: "error",
            });
            console.log(error.text);
        });
        console.log(data);
    }

    return (
        <>
            <main className='mainRestablecerContraseña'>
                <h1 className='tituloRestablecerContra'>Restablecer contraseña</h1>
                <h2 className='subtituloRestablecerContra'>Por favor Ingresá la dirección de email asociada a tu cuenta</h2>
                <section>
                    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                        <input className='inputLogin' type="email" placeholder='Ingresá tu email...' {...register("email")} />
                        <p className='mt-2'>Te enviaremos un link para restablecer su contraseña. Si no recibes el email después de unos minutos, verifica tu carpeta de correo no deseado.</p>
                        <Boton onClick={handleSubmit(onSubmit)}  estilo='botonAzul botonLogin mt-4' texto='Enviar mail' />
                    </form>
                </section>
            </main>
        </>
    )
}

export default RestablecerContrasena