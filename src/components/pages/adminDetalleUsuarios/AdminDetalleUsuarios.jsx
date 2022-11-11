import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useFetchData } from '../../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';

const AdminDetalleUsuarios = () => {

    const userContext = useContext(UserContext);
    const { token } = userContext;
    const {id} = useParams();

    const { fetchData, data } = useFetchData(`/users?id=${id}`, token);

    useEffect(() => {
        fetchData();
    }, [])

    console.log (data);

    return (
        <main>
            <section>
                <h1>Datos del usuario</h1>
                <ul>
                    <li>Nombre completo: {data.fullname}</li>
                    <li>Email: {data.email}</li>
                    <li>Dirección: {data.address}</li>
                    <li>Telefono: {data.phone}</li>
                </ul>
            </section>
        </main>
    )
}

export default AdminDetalleUsuarios