import React, { useContext } from 'react'
import Boton from '../boton/Boton'
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';


const AdminEditarCamiseta = (props) => {

    const userContext = useContext(UserContext);
    const { token } = userContext;
    const {register, errors, handleSubmit} = useForm();    

    const onSubmit = (data) => {
        const fetchOptions = {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };
        fetch(`http://127.0.0.1:3001/products/${props.id}`, fetchOptions)
            .then(res => {
                if(res.status === 200){
                    console.log('ok')
                }else{
                    console.log('ups')
                }
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombreCamiseta">Nombre del producto: </label>
            <input className='inputRegistrate formAdminCamisetas' name='name' type="text" placeholder='Nombre del producto...' defaultValue={props.name} {...register("name")} />
            <label htmlFor="imgCamiseta">Imagen: </label>
            <input className='inputRegistrate formAdminCamisetas' name='images' type="file" placeholder='Imagen...' /* {...register("images")} */ />
            <label htmlFor="descuentoCamiseta">Descuento: (Si no tiene descuento, poner 0) </label>
            <input className='inputRegistrate formAdminCamisetas' name='discount' type="number" placeholder='Descuento...' defaultValue={props.discount} {...register("discount")} />
            <label htmlFor="precioCamiseta">Precio: </label>
            <input className='inputRegistrate formAdminCamisetas' name='price' type="number" placeholder='Precio...' defaultValue={props.price} {...register("price")} />
            <label htmlFor="stockCamiseta">Stock: </label>
            <input className='inputRegistrate formAdminCamisetas' name='stock' type="number" placeholder='Stock...' defaultValue={props.stock} {...register("stock")} />
            <div className='containerSelectFormAdmin formAdminCamisetas'>
                <label htmlFor="coleccion">Colección</label>
                <select name="collection" id="" defaultValue={props.collection} {...register("collection")}>
                    <option value="Camisetas temporada actual">Camisetas temporada actual</option>
                    <option value="Retros de coleccion">Retros de coleccion</option>
                    <option value="Entrenamiento y salidas">Entrenamiento y salidas</option>
                </select>
            </div>
            <label htmlFor="descripcionCamiseta">Descripcion: </label>
            <textarea className='inputRegistrate formAdminCamisetas' rows={8} name='description' type="text" placeholder='Descripcion...' defaultValue={props.description} {...register("description")} />
            <Boton estilo='botonAzul botonLogin' onClick={handleSubmit(onSubmit)} texto='Editar producto' />
        </form>
    )
}

export default AdminEditarCamiseta