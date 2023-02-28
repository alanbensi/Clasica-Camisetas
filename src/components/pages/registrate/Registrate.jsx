import React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../../atoms/boton/Boton';
import './Registrate.css';
import { useFetchData } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert';
import base64 from 'base-64';
import { useFetchNoToken } from '../../../hooks/useFetchNoToken';

const Registrate = () => {
    const [email, setEmail] = useState('');
    const [errorMsj, setErrorMsj] = useState('');
    const [tipoInput, settipoInput] = useState("password");
    const [html,setHtml] = useState("");
    const { fetchData, data, loading } = useFetchData(email ? `/users/checkEmail?email=${email}` : '');
    const urlFront = process.env.REACT_APP_URL_FRONT;
    
    const {fetchData:sendMail,data:dataMail} = useFetchNoToken(html ? `/mail?mailTo=${email}&subject=Bienvenido!&html=${html}`:'');

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

    useEffect(()=> {
        if(html !== "") {
            sendMail();
        }
    },[html])

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
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
        const dataCoded = base64.encode(JSON.stringify(data));
        setHtml (`<div><h1>Bienvenido ${data.username}</h1><p>Gracias por registrarte en Clasica Camisetas</p><p>Ingresá a <a href="${urlFront}/validacionMail/${dataCoded}">este link</a> para validar tu e-mail</p></div>`)
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
                        <input className='inputRegistrate' type="email" placeholder='Email *'{...register("email", {required: true , pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}})} onBlur={(e)=>checkEmail(e)} />
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