import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AdminFormCamisetas.css';
import { useFetchData } from "../../../hooks/useFetch";
import AdminEditarCamiseta from '../../atoms/adminEditarCamiseta/AdminEditarCamiseta';
import AdminAgregarCamisetas from '../../atoms/adminAgregarCamisetas/AdminAgregarCamisetas';

const AdminFormCamisetas = () => {

    const { id } = useParams();
    const { fetchData, data } = useFetchData(`/products/id/${id}`);

    useEffect(() => {
        fetchData();
        console.log ("id de data", id)
    }, [id])

    useEffect(() => {
        console.log (data, "data editar")
    }, [data])

    
    return (
        <main className='px-3 py-3'>
            {
                data && id ?
                    (
                        <div key={data.id}>
                            <h1 className='tituloFormAdminCamiseta'>Editar producto</h1>
                            <AdminEditarCamiseta id={data.id} name={data.name} images={data.images} discount={data.discount} price={data.price} price_usd={data.price_usd} stock={data.stock} collection={data.collection} description={data.description} year={data.year} />
                        </div>
                    )
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