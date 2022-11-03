import React from 'react'
import Boton from '../boton/Boton'

const AdminAgregarCamisetas = () => {
    return (
        <form>
            <label htmlFor="nombreCamiseta">Nombre del producto: </label>
            <input className='inputRegistrate formAdminCamisetas' name='nombreCamiseta' type="text" />
            <label htmlFor="imgCamiseta">Imagen: </label>
            <input className='inputRegistrate formAdminCamisetas' name='imgCamiseta' type="file" />
            <label htmlFor="descuentoCamiseta">Descuento: (Si no tiene descuento, poner 0) </label>
            <input className='inputRegistrate formAdminCamisetas' name='descuentoCamiseta' type="number" />
            <label htmlFor="precioCamiseta">Precio: </label>
            <input className='inputRegistrate formAdminCamisetas' name='precioCamiseta' type="number" />
            <label htmlFor="stockCamiseta">Stock: </label>
            <input className='inputRegistrate formAdminCamisetas' name='stockCamiseta' type="number" />
            <div className='containerSelectFormAdmin formAdminCamisetas'>
                <label htmlFor="coleccion">Colección</label>
                <select name="coleccion" id="">
                    <option value="Camisetas temporada actual">Camisetas temporada actual</option>
                    <option value="Retros de coleccion">Retros de coleccion</option>
                    <option value="Entrenamiento y salidas">Entrenamiento y salidas</option>
                </select>
            </div>
            <label htmlFor="descripcionCamiseta">Descripcion: </label>
            <textarea className='inputRegistrate formAdminCamisetas' rows={8} name='descripcionCamiseta' type="text" />
            <Boton estilo='botonAzul botonLogin' texto='Agregar producto' />
        </form>
    )
}

export default AdminAgregarCamisetas