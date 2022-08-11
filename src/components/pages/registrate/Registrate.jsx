import React from 'react'
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Boton from '../../atoms/boton/Boton';
import './Registrate.css'

const Registrate = () => {

    const [tipoInput, settipoInput] = useState("password");
    const mostrarContraseña = () => {
        if (tipoInput === "password") {
            settipoInput ("text");
        }
        else {
            settipoInput ("password");
        }
    };

    return (
        <>
            <main className='mainRegistrate'>
                <h1 className='tituloRegistrate'>Ingresá tus datos y crea tu cuenta</h1>
                <section>
                    <form action="" method="post">
                        <input className='inputRegistrate' type="text" placeholder='Nombres' />
                        <input className='inputRegistrate' type="text" placeholder='Apellidos' />
                        <input className='inputRegistrate' type="email" placeholder='Email' />
                        <input className='inputRegistrate' type="tel" placeholder='Número de teléfono' />
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput} placeholder='Contraseña' />
                            <Icon onClick={mostrarContraseña} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput} placeholder='Repetir contraseña' />
                            <Icon onClick={mostrarContraseña} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <div className='d-flex mt-2'>
                            <input className='inputRegistrateCheckbox' type="checkbox"  />
                            <label>Acepto los <span className=''>Términos y condiciones</span></label>
                        </div>
                        <Boton estilo='botonAzul botonLogin' texto='Registrate' />
                    </form>
                    <div>
                        <p className='textoCentrado'>¿Ya tenés una cuenta? <Link to='/Login' className='linkRegistro'>Ingresá ahora</Link></p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Registrate