import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Boton from '../../atoms/boton/Boton'
import './NuevaContraseña.css'

const NuevaContraseña = () => {
    return (
        <>
            <main className='p-3'>
                <section>
                    <h1 className='tituloNuevaContraseña'>Restablecer contraseña</h1>
                    <h2 className='subtituloNuevaContraseña'>Por favor ingresa tu nueva contraseña y confirma para continuar</h2>
                    <form action="" method="post">
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type='password' placeholder='Contraseña' />
                            <Icon icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type='password' placeholder='Repetir contraseña' />
                            <Icon icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <Link className='linksRouter' to='/Login-Nueva-Contrasena'>
                            <Boton estilo='botonAzul botonLogin mt-5' texto='Continuar'></Boton>
                        </Link>
                    </form>
                </section>
            </main>
        </>

    )
}

export default NuevaContraseña