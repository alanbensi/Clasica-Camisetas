import React from 'react'
import Boton from '../boton/Boton'

const AdminEditarCamiseta = (props) => {
    return (
        <form>
            <label htmlFor="nombreCamiseta">Nombre del producto: </label>
            <input className='inputRegistrate formAdminCamisetas' name='nombreCamiseta' type="text" placeholder='Nombre del producto...' defaultValue={props.name} />
            <label htmlFor="imgCamiseta">Imagen: </label>
            <input className='inputRegistrate formAdminCamisetas' name='imgCamiseta' type="file" placeholder='Imagen...' />
            <label htmlFor="descuentoCamiseta">Descuento: (Si no tiene descuento, poner 0) </label>
            <input className='inputRegistrate formAdminCamisetas' name='descuentoCamiseta' type="number" placeholder='Descuento...' defaultValue={props.discount} />
            <label htmlFor="precioCamiseta">Precio: </label>
            <input className='inputRegistrate formAdminCamisetas' name='precioCamiseta' type="number" placeholder='Precio...' defaultValue={props.price} />
            <label htmlFor="stockCamiseta">Stock: </label>
            <input className='inputRegistrate formAdminCamisetas' name='stockCamiseta' type="number" placeholder='Stock...' defaultValue={props.stock} />
            <div className='containerSelectFormAdmin formAdminCamisetas'>
                <label htmlFor="coleccion">Colección</label>
                <select name="coleccion" id="" defaultValue={props.collection}>
                    <option value="Camisetas temporada actual">Camisetas temporada actual</option>
                    <option value="Retros de coleccion">Retros de coleccion</option>
                    <option value="Entrenamiento y salidas">Entrenamiento y salidas</option>
                </select>
            </div>
            <label htmlFor="descripcionCamiseta">Descripcion: </label>
            <textarea className='inputRegistrate formAdminCamisetas' rows={8} name='descripcionCamiseta' type="text" placeholder='Descripcion...' defaultValue={props.description} />
            <Boton estilo='botonAzul botonLogin' texto='Editar producto' />
        </form>
    )
}

export default AdminEditarCamiseta