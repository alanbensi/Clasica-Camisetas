import React, { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useFetchData } from '../../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';
import { Icon } from '@iconify/react';import { Link } from 'react-router-dom';
;

const AdminUsuarios = () => {
    const userContext = useContext(UserContext);
    const { userAdmin, token } = userContext;

    const { fetchData, data } = useFetchData('/users', token);

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <main>
            {
                userAdmin ?
                    (
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Ver mas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map ((usuario)=> (
                                        <tr key={usuario.id}>
                                            <td>{usuario.name}</td>
                                            <td>{usuario.surname}</td>
                                            <td>{usuario.email}</td>
                                            <td>
                                                <Link to={`/admin/usuarios/${usuario.id}`}>
                                                    <Icon icon="bi:eye-fill" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    )
                    :
                    (<p>Hola</p>)
            }

        </main>
    );
}

export default AdminUsuarios;