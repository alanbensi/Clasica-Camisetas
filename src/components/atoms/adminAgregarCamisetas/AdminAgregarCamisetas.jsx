import React from 'react'
import Boton from '../boton/Boton'
import { useForm } from "react-hook-form"


const AdminAgregarCamisetas = () => {
    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombreCamiseta">Nombre del producto: </label>
            <input className='inputRegistrate formAdminCamisetas' name='nombreCamiseta' type="text"  {...register("nombreCamiseta")} />
            <label htmlFor="imgCamiseta">Imagen: </label>
            <input className='inputRegistrate formAdminCamisetas' name='imgCamiseta' type="file"  {...register("imagenCamiseta")}/>
            <label htmlFor="descuentoCamiseta">Descuento: (Si no tiene descuento, poner 0) </label>
            <input className='inputRegistrate formAdminCamisetas' name='descuentoCamiseta' type="number"  {...register("descuentoCamiseta")}/>
            <label htmlFor="precioCamiseta">Precio: </label>
            <input className='inputRegistrate formAdminCamisetas' name='precioCamiseta' type="number" {...register("precioCamiseta")} />
            <label htmlFor="stockCamiseta">Stock: </label>
            <input className='inputRegistrate formAdminCamisetas' name='stockCamiseta' type="number"  {...register("stockCamiseta")}/>
            <div className='containerSelectFormAdmin formAdminCamisetas'>
                <label htmlFor="coleccion">Colección</label>
                <select name="coleccion" {...register("coleccionCamiseta")} id="">
                    <option value="Camisetas temporada actual">Camisetas temporada actual</option>
                    <option value="Retros de coleccion">Retros de coleccion</option>
                    <option value="Entrenamiento y salidas">Entrenamiento y salidas</option>
                </select>
            </div>
            <label htmlFor="descripcionCamiseta">Descripcion: </label>
            <textarea className='inputRegistrate formAdminCamisetas' rows={8} name='descripcionCamiseta' type="text" {...register("descripcionCamiseta")} />
            <Boton estilo='botonAzul botonLogin' texto='Agregar producto' onClick={handleSubmit(onSubmit)} />
        </form>
    )
}

export default AdminAgregarCamisetas