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
        console.log (emailValue, "email value")
    }

    useEffect(() => {        
        fetchData();
    }, [email]); 
    
    useEffect(() => {
        setErrorMsj(data.error ? data.error : "");
    }, [data]); 

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    console.log (errors, "ESTE ES EL ERROR DEL FORMULARIO, AGUANTE BOKITA.")

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
                        title: "Te registraste con exito!",
                        icon: 'success',
                        buttons: 'Login',
                        link: `/Login`,
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
                        <input className='inputRegistrate' type="text" placeholder='Nombres *' {...register("name", {required: true})}/>
                        {errors.name? (<p className='erroresForm'>Este campo es obligatorio.</p>):("")}
                        <input className='inputRegistrate' type="text" placeholder='Apellidos *' {...register("surname", { required: true })} />
                        {errors.surname ? (<p className='erroresForm'>Este campo es obligatorio.</p>) : ("")}
                        <input className='inputRegistrate' type="text" placeholder='Nombre de usuario *' {...register("username",{required:true})} />
                        {errors.username ? (<p className='erroresForm'>Este campo es obligatorio.</p>) : ("")}
                        <input className='inputRegistrate' type="email" placeholder='Email *'{...register("email", {required: true , pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}})} />
                        {errors.email && errors.email.type === "required" ? (<p className='erroresForm'>Este campo es obligatorio.</p>) : ("")}
                        {errors.email && errors.email.type === "pattern" ? (<p className='erroresForm'>El formato del mail es incorrecto.</p>) : ("")}
                        <input className='inputRegistrate' type="number" placeholder='Número de teléfono *' {...register("phone", { required: true })} />
                        {errors.phone ? (<p className='erroresForm'>Este campo es obligatorio.</p>) : ("")}
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput} placeholder='Contraseña *' {...register("password", { required: true, minLength: 8 })} />
                            <Icon onClick={mostrarContraseña} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        {errors.password && errors.password.type === "required" ? (<p className='erroresForm'>Este campo es obligatorio.</p>) : ("")}
                        {errors.password && errors.password.type === "minLength" ? (<p className='erroresForm'>La contraseña debe tener al menos 8 caracteres</p>) : ("")}
                        <div className='containerInputPassword'>
                            <input className='inputRegistrate' type={tipoInput2} placeholder='Repetir contraseña *' {...register("confirmPassword", {
                                required: true,
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            })} />
                            <Icon onClick={mostrarContraseña2} icon="clarity:eye-line" className='iconoOjoRegistrate' />
                        </div>
                        {errors.confirmPassword ? (<p className='erroresForm'>Las contraseñas no coinciden</p>) : ("")}
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