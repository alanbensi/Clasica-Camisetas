import React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../../atoms/boton/Boton';
import './Registrate.css';
import { useFetchData } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert';

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

    const { register, errors, handleSubmit } = useForm();

    const redirect = useNavigate();
    const handleSwal = (info) => {
        if (info.buttons.length > 1) {
            Swal({
                title: info.title,
                text: info.text,
                icon: info.icon,
                buttons: info.buttons,
                timer: info.timer
            })
                .then(resp => {
                    if (resp) {
                        redirect(info.link)
                    }
                })
        } else {
            Swal({
                title: info.title,
                text: info.text,
                icon: info.icon,
                buttons: info.buttons,
                timer: info.timer
            })
        }
    }

    const onSubmit = (data) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };
        fetch(`http://127.0.0.1:3001/users`, fetchOptions)
            .then(res => {
                if (res.status === 201) {
                    handleSwal({
                        title: "Enviar mail al usuario",
                        icon: 'success',
                        buttons: ['Cerrar', 'Inicio'],
                        link: `/`,
                        timer: ''
                    });
                } else {
                    handleSwal({
                        title: "Ocurrió un error.",
                        text: "Asegurate de estar completando todos los campos!",
                        icon: 'error',
                        buttons: 'Cerrar',
                        link: `/Registrate`,
                        timer: ''
                    });
                }
            })
    }

    

    return (
        <>
            <main className='mainRegistrate'>
                <h1 className='tituloRegistrate'>Ingresá tus datos y crea tu cuenta</h1>
                <section>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='inputRegistrate' type="text" placeholder='Nombres' {...register("name")}/>
                        <input className='inputRegistrate' type="text" placeholder='Apellidos' {...register("surname")}/>
                        <input className='inputRegistrate' type="email" placeholder='Email' onBlur={(e) => checkEmail(e)}{...register("email")}/>
                        {errorMsj && <p>{errorMsj}</p>}
                        <input className='inputRegistrate' type="number" placeholder='Número de teléfono' {...register("phone")}/>
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput} placeholder='Contraseña' {...register("password")}/>
                            <Icon onClick={mostrarContraseña} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput2} placeholder='Repetir contraseña'/>
                            <Icon onClick={mostrarContraseña2} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        <div className='d-flex mt-2'>
                            <input className='inputRegistrateCheckbox' type="checkbox"  {...register("terminosCondiciones")}/>
                            <label>Acepto los <span className=''>Términos y condiciones</span></label>
                        </div>
                        <Boton estilo='botonAzul botonLogin' texto='Registrate' onClick= {handleSubmit(onSubmit)} />
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