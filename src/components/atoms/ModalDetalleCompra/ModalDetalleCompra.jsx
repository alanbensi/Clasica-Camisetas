import React, { useContext } from 'react'
import { SwitchDivisaContext } from '../../context/SwitchDivisaContext';

const ModalDetalleCompra = () => {
    const carritoLocal = JSON.parse(localStorage.getItem('Carrito'));
    const precioPorCantidad = (precio, cantidad) => {
        const precioPorCantidad = precio * cantidad;
        console.log (precioPorCantidad, "precio x cantidad");
        return precioPorCantidad;
    }

    const switchDivisa = useContext(SwitchDivisaContext);
    const { switchDivisaContexto } = switchDivisa; 

    return (
        <>
            {carritoLocal.map((item) => (
                <div key={item.id}>
                    <div className='d-flex justify-content-around my-4'>
                        <img className='imgCardCarrito' src={item.images} alt={item.name} />
                        <div className='w-100'>
                            <h2 className='nombreCamisetaCardCarrito'>{`${item.name} (${item.cantidad} U)`}</h2>
                            <div className='d-flex align-items-center justify-content-between'>
                                {switchDivisaContexto ? 
                                (<p className='m-0'>{precioPorCantidad(item.price_usd, item.cantidad)} USD</p>)
                                :
                                (<p className ='m-0'>${ precioPorCantidad(item.precioFinal, item.cantidad) }</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ModalDetalleCompra