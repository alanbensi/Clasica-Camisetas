import React, { createContext, useState } from 'react'

export const CartContext = createContext (null);

const CartProvider = (props) => {

    const [carritoContexto, setCarritoContexto] = useState(0);

    return (
        <CartContext.Provider value={{carritoContexto, setCarritoContexto}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider

