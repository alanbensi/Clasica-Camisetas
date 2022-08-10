import React from 'react'
import Boton from '../../atoms/boton/Boton'
import './RestablecerContraseña.css'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const RestablecerContraseña = () => {

    const accionCompletada = swal({
        title: "Acción completada",
        text: "Te enviamos un email para recuperar la contraseña. Por favor revisá tu bandeja de entrada y seguí las instrucciones indicadas",
        icon: "success",
    });

    return (
        <>
            <main className='mainRestablecerContraseña'>
                <h1 className='tituloRestablecerContra'>Restablecer contraseña</h1>
                <h2 className='subtituloRestablecerContra'>Por favor Ingresá la dirección de email asociada a tu cuenta</h2>
                <section>
                    <form action="" method="post">
                        <input className='inputLogin' type="email" placeholder='Ingresá tu email...' />
                        <p className='mt-2'>Te enviaremos un link para restablecer su contraseña. Si no recibes el email después de unos minutos, verifica tu carpeta de correo no deseado.</p>
                        <Link className='linksRouter' to='/Mail-Restablecer-Contrasena'>
                            <Boton onClick={accionCompletada} estilo='botonAzul botonLogin mt-4' texto='Enviar mail' />
                        </Link>
                    </form>
                </section>
            </main>
        </>
    )
}

export default RestablecerContraseña