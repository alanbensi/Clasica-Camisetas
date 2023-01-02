import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Boton from '../../atoms/boton/Boton';
import { useFetchData } from '../../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';
import './EditarMiCuenta.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';

const EditarMiCuenta = () => {
    const userContext = useContext(UserContext);
    const { token } = userContext;

    const { fetchData: getInfoUser, data: dataUser, loading: loadingUser } = useFetchData('/users', token);
    
    useEffect(() => {
        getInfoUser();
    }, []);
    
    useEffect(() => {
        console.log(dataUser, "hola")
    }, [dataUser]);
    
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
                        redirect(info.link2);
                    } else {
                        redirect(info.link);
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
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };
        fetch(`http://127.0.0.1:3001/users/${dataUser.id}`, fetchOptions)
            .then(res => {
                if (res.status === 200) {
                    handleSwal({
                        title: "El producto se modifico con exito!",
                        icon: 'success',
                        buttons: ['Cerrar', 'Ir a mi cuenta'],
                        link: "/",
                        link2: `/Mi-cuenta/${dataUser.id}`,
                        timer: ''
                    });
                }else {
                    handleSwal({
                        title: "Ocurrió un error.",
                        text: "Asegurate de estar completando todos los campos!",
                        icon: 'error',
                        buttons: 'Cerrar',
                        link: `/Editar-mi-cuenta/${dataUser.id}`,
                        timer: ''
                    });
                }
            })
    }

    
    return (
        <main className='p-3'>
            <h1 className='tituloEditarDatos'>Editar mis datos</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Nombre</label>
                <input className='inputRegistrate formAdminCamisetas' name='name' type="text" placeholder='Nombre...' defaultValue={dataUser.name} {...register("name")} />
                <label htmlFor="surname">Apellido</label>
                <input className='inputRegistrate formAdminCamisetas' name='surname' type="text" placeholder='Apellido' defaultValue={dataUser.surname} {...register("surname")} />
                <label htmlFor="phone">Telefono</label>
                <input className='inputRegistrate formAdminCamisetas' name='phone' type="tel" placeholder='Telefono' defaultValue={dataUser.phone} {...register("phone")} />
                <Boton estilo='botonAzul botonLogin' onClick={handleSubmit(onSubmit)} texto='Editar datos' />
            </form>
        </main>
    )
}

export default EditarMiCuenta