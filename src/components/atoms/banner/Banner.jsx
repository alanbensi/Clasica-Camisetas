import React from 'react'
import banner from '../../../assets/futbol-concepto-exito-meta.jpg'
import './Banner.css'

const Banner = () => {
    return (
        <div>
            <img className='bannerInicial' src= {banner} alt="Banner inicial. Pelota entrando al arco" />
        </div>
    )
}

export default Banner