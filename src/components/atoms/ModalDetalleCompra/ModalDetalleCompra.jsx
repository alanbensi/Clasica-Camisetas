import React from 'react'

const ModalDetalleCompra = () => {
    const carritoLocal = JSON.parse(localStorage.getItem('Carrito'));
    const precioPorCantidad = (precio, cantidad) => {
        const precioPorCantidad = precio * cantidad;
        return precioPorCantidad;
    }

    return (
        <>
            {carritoLocal.map((item) => (
                <div key={item.id}>
                    <div className='d-flex justify-content-around my-4'>
                        <img className='imgCardCarrito' src={item.images} alt={item.name} />
                        <div className='w-100'>
                            <h2 className='nombreCamisetaCardCarrito'>{`${item.name} (${item.cantidad} U)`}</h2>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='m-0'>${precioPorCantidad(item.precioFinal, item.cantidad)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ModalDetalleCompra