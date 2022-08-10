import React from 'react'
import { Link } from 'react-router-dom'
import Boton from '../../atoms/boton/Boton'

const MailRestablecerContraseña = () => {
    return (
        <>
            <main className='p-3'>
                <section className='mt-3'>
                    <p className='mb-5'>Has solicitado restablecer la contraseña de tu cuenta en clasica1905.com.ar. <br />Para verificar que la solicitud fue hecha por vos, por favor haz clic en el botón a continuación y seguí los pasos para restablecer.</p>
                    <Link className='linksRouter' to='/Nueva-Contrasena'>
                        <Boton estilo='botonAzul botonLogin mt-4' texto='Restablecer contraseña'></Boton>
                    </Link>
                </section>
            </main>
        </>
    )
}

export default MailRestablecerContraseña