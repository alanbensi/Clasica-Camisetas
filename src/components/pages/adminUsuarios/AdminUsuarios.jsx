import React, { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useFetchData } from '../../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const AdminUsuarios = () => {
    const userContext = useContext(UserContext);
    const { userAdmin, token } = userContext;

    const { fetchData, data } = useFetchData('/users', token);

    useEffect(() => {
        fetchData();
    }, [])

    const columns = [
        { field: 'name', headerName: 'Nombre', width: 130 },
        { field: 'surname', headerName: 'Apellido', width: 130 },
        { field: 'email', headerName: 'Mail', width: 130 },
        { field: 'verMas', headerName: 'Ver más', width: 130 },
    ];

    return (
        <main>
            {
                userAdmin ?
                    (
                        <DataGrid 
                        rows={data}
                        columns={columns}
                        pageSize={2}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        autoHeight
                        />
                        // <Table responsive striped bordered hover>
                        //     <thead>
                        //         <tr>
                        //             <th>Nombre</th>
                        //             <th>Apellido</th>
                        //             <th>Email</th>
                        //             <th>Ver mas</th>
                        //         </tr>
                        //     </thead>
                        //     <tbody>
                        //         {
                        //             data.map ((usuario)=> (
                        //                 <tr key={usuario.id}>
                        //                     <td>{usuario.name}</td>
                        //                     <td>{usuario.surname}</td>
                        //                     <td>{usuario.email}</td>
                        //                     <td>
                        //                         <Link to={`/admin/usuarios/${usuario.id}`}>
                        //                             <Icon icon="bi:eye-fill" />
                        //                         </Link>
                        //                     </td>
                        //                 </tr>
                        //             ))}
                        //     </tbody>
                        // </Table>
                    )
                    :
                    (<p>Hola</p>)
            }
        </main>
    );
}

export default AdminUsuarios;