import React from 'react'
import Boton from '../boton/Boton'
import { useForm } from "react-hook-form";


const AdminEditarCamiseta = (props) => {

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombreCamiseta">Nombre del producto: </label>
            <input className='inputRegistrate formAdminCamisetas' name='nombreCamiseta' type="text" placeholder='Nombre del producto...' defaultValue={props.name} {...register("nombreCamiseta")} />
            <label htmlFor="imgCamiseta">Imagen: </label>
            <input className='inputRegistrate formAdminCamisetas' name='imgCamiseta' type="file" placeholder='Imagen...' {...register("imagenCamiseta")} />
            <label htmlFor="descuentoCamiseta">Descuento: (Si no tiene descuento, poner 0) </label>
            <input className='inputRegistrate formAdminCamisetas' name='descuentoCamiseta' type="number" placeholder='Descuento...' defaultValue={props.discount} {...register("descuentoCamiseta")} />
            <label htmlFor="precioCamiseta">Precio: </label>
            <input className='inputRegistrate formAdminCamisetas' name='precioCamiseta' type="number" placeholder='Precio...' defaultValue={props.price} {...register("precioCamiseta")} />
            <label htmlFor="stockCamiseta">Stock: </label>
            <input className='inputRegistrate formAdminCamisetas' name='stockCamiseta' type="number" placeholder='Stock...' defaultValue={props.stock} {...register("stockCamiseta")} />
            <div className='containerSelectFormAdmin formAdminCamisetas'>
                <label htmlFor="coleccion">Colección</label>
                <select name="coleccion" id="" defaultValue={props.collection} {...register("coleccionCamiseta")}>
                    <option value="Camisetas temporada actual">Camisetas temporada actual</option>
                    <option value="Retros de coleccion">Retros de coleccion</option>
                    <option value="Entrenamiento y salidas">Entrenamiento y salidas</option>
                </select>
            </div>
            <label htmlFor="descripcionCamiseta">Descripcion: </label>
            <textarea className='inputRegistrate formAdminCamisetas' rows={8} name='descripcionCamiseta' type="text" placeholder='Descripcion...' defaultValue={props.description} {...register("descripcionCamiseta")} />
            <Boton estilo='botonAzul botonLogin' onClick={handleSubmit(onSubmit)} texto='Editar producto' />
        </form>
    )
}

export default AdminEditarCamiseta