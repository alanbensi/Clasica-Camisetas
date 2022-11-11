import React from 'react'
import iconoMP from '../../../assets/LOGO Mercado-Pago.png'
import iconoPayPal from '../../../assets/LOGO Paypal.png'
import './ModalMediosPago.css'

const ModalMediosPago = () => {
    return (
        <div className='modalMediosPago'>
            <img className='imgMediosPagoFooter logoMP' src={iconoMP} alt="Mercado pago" />
            <img className='imgMediosPagoFooter logoPayPal' src={iconoPayPal} alt="PayPal" />
        </div>
    )
}

export default ModalMediosPago