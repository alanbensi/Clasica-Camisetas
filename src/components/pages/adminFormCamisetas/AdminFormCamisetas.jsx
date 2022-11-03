import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Boton from '../../atoms/boton/Boton';
import './AdminFormCamisetas.css';
import { useFetchData } from "../../../hooks/useFetch";
import AdminEditarCamiseta from '../../atoms/adminEditarCamiseta/AdminEditarCamiseta';
import AdminAgregarCamisetas from '../../atoms/adminAgregarCamisetas/AdminAgregarCamisetas';

const AdminFormCamisetas = () => {

    const { id } = useParams();
    const { fetchData, data } = useFetchData(`/products/${id}`);

    useEffect(() => {
        fetchData();
    }, [id])

    console.log('cacatulo', data);
    return (
        <main className='px-3 py-3'>

            {
                id ?
                    (data.map((item) => (
                        <>
                            <h1 className='tituloFormAdminCamiseta'>Editar producto</h1>
                            <AdminEditarCamiseta name={item.name} discount={item.discount} price={item.price} stock={item.stock} collection={item.collection} description={item.description} />
                        </>
                    )))
                    :
                    (
                        <>
                            <h1 className='tituloFormAdminCamiseta'>Agregar un nuevo producto</h1>
                            <AdminAgregarCamisetas />
                        </>
                    )
            }

        </main>
    )
}

export default AdminFormCamisetas