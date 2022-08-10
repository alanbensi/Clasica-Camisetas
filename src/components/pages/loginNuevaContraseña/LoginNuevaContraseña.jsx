import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Boton from '../../atoms/boton/Boton'
import './LoginNuevaContraseña.css'

const LoginNuevaContraseña = () => {
    return (
        <>
            <main className='p-3'>
                <section>
                    <h1 className='tituloLoginNuevaContra'>Contraseña creada</h1>
                    <h2 className='subtituloLoginNuevaContra'>Ingresá a tu cuenta</h2>
                    <form action="" method="post">
                        <input className='inputLogin' type="email" placeholder='Ingresá tu email...' />
                        <div className='containerInputPassword'>
                            <input className='inputLogin inputPassword mb-5' type= "password" placeholder='Ingresá tu contraseña...' />
                            <Icon icon="clarity:eye-line" className='iconoOjo iconoLoginNuevaContra' />
                        </div>
                        <Link to='/Restablecer-Contrasena' className='linkContraseñaOlvidada'>¿Olvidaste tu contraseña?</Link>
                        <Boton estilo='botonAzul botonLogin mt-3' texto='Ingresá' />
                    </form>
                </section>
            </main>
        </>

    )
}

export default LoginNuevaContraseña