import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Boton from '../../atoms/boton/Boton';
import { useFetchData } from '../../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';
import './EditarMiCuenta.css'

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

    const onSubmit = (data) => {
        console.log (data)
    };

    
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