import React from 'react'
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Boton from '../../atoms/boton/Boton';
import './Registrate.css'
import { useFetchData } from "../../../hooks/useFetch";

const Registrate = () => {
    const [email, setEmail] = useState('');
    const [errorMsj, setErrorMsj] = useState('');
    const [tipoInput, settipoInput] = useState("password");
    const { fetchData, data, loading } = useFetchData(email ? `/users/checkEmail?email=${email}` : '');
    
    const mostrarContraseña = () => {
        if (tipoInput === "password") {
            settipoInput ("text");
        }
        else {
            settipoInput ("password");
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

    const checkEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
    }

    useEffect(() => {        
        fetchData();
    }, [email]); 
    
    useEffect(() => {
        setErrorMsj(data.error ? data.error : "");
    }, [data]); 

    return (
        <>
            <main className='mainRegistrate'>
                <h1 className='tituloRegistrate'>Ingresá tus datos y crea tu cuenta</h1>
                <section>
                    <form action="" method="post">
                        <input className='inputRegistrate' type="text" placeholder='Nombres' />
                        <input className='inputRegistrate' type="text" placeholder='Apellidos' />
                        <input className='inputRegistrate' type="email" placeholder='Email' onBlur={(e) => checkEmail(e)}/>
                        {errorMsj && <p>{errorMsj}</p>}
                        <input className='inputRegistrate' type="tel" placeholder='Número de teléfono' />
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput} placeholder='Contraseña' />
                            <Icon onClick={mostrarContraseña} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput2} placeholder='Repetir contraseña' />
                            <Icon onClick={mostrarContraseña2} icon="clarity:eye-line" className='iconoOjoRegistrate' />
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