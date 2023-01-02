import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ContadorCarrito from '../../atoms/contadorCarrito/ContadorCarrito';
import './Carrito.css'
import { Icon } from '@iconify/react';
import Boton from '../../atoms/boton/Boton'
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert';


const Carrito = () => {

    const cartContext = useContext (CartContext);
    const {setCarritoContexto} = cartContext;

    const userContext = useContext(UserContext);
    const { userID } = userContext;

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);

    const [carrito, setCarrito] = useState ([]);
    const [cambioContador, setCambioContador] = useState(true);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [precioTotalUSD, setPrecioTotalUSD] = useState (0); 

    const borrarItem = (id)=> {
        setCarrito (carrito.filter((item)=>item.id !== id));        
    };

    const redirect = useNavigate();
    const handleSwal = (info) => {
        if (info.buttons.length > 1) {
            Swal({
                title: info.title,
                text: info.text,
                icon: info.icon,
                buttons: info.buttons,
                timer: info.timer
            })
                .then(resp => {
                    if (resp) {
                        redirect(info.link2);
                    }else {
                        redirect(info.link);
                    }
                })
        } else {
            Swal({
                title: info.title,
                text: info.text,
                icon: info.icon,
                buttons: info.buttons,
                timer: info.timer
            })
        }
    }

    const iniciarCompra = ()=> {
        if (userID) {
            redirect('/Detalle-de-compra'); 
        } else {
            handleSwal({
                title: "No tendrás seguimiento!",
                text: "El seguimiento de tu compra solo podrá ser realizado en caso de que estés logueado.",
                icon: 'warning',
                buttons: ['Continuar', 'Ir al login'],
                link: "/Detalle-de-compra",
                link2: "/login",
                timer: ''
            });
        }
    }

    useEffect (()=>{
        if (localStorage.getItem('Carrito')) {setCarrito(JSON.parse(localStorage.getItem('Carrito')))};
    },[cambioContador]);

    useEffect(() => {
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    setCarritoContexto(carrito.length);
    },[carrito]);

    const contador = (contador,id)=> {
        const local= JSON.parse(localStorage.getItem('Carrito'));
        const index = local.findIndex((obj=>obj.id === id));
        if (index >= 0){
            local[index].cantidad = contador;
            setCarrito (local);
            calculoPrecioTotal();
        }
    }

    const precioPorCantidad = (precio, cantidad) => {
        const precioPorCantidad = precio * cantidad;
        return precioPorCantidad; 
    }

    const calculoPrecioTotal = ()=> {
        let cuenta= 0; 
        let cuentaUSD = 0; 
        carrito.map(item => {
            cuenta += (parseInt(item.cantidad) * parseInt(item.precioFinal));
            cuentaUSD += (parseInt(item.cantidad) * parseInt(item.price_usd));
        });
        setPrecioTotal(cuenta);
        setPrecioTotalUSD (cuentaUSD);
    }

    useEffect(() => {
        calculoPrecioTotal();
    },[carrito])
    

    return (
        <main className='px-3'>
            <section className='d-flex mt-2 mb-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <p className='breadcrumb ms-1'>{titulo}</p>
            </section>
            <section>
                <h1 className='tituloCarrito'>Carrito de compras</h1>
                <div>
                    {carrito.length !== 0 ? 
                    (carrito.map ((item)=>(
                    <div key={item.id}>
                        <div className='d-flex justify-content-around my-4'>
                            <img className='imgCardCarrito' src={item.images} alt={item.name} />
                            <div className='w-100'>
                                <h2 className='nombreCamisetaCardCarrito'>{item.name}</h2>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <ContadorCarrito handleClick= {contador} carrito={carrito} camiseta={item}/>
                                    <p className='m-0'>${precioPorCantidad(item.precioFinal, item.cantidad)}</p>
                                </div>
                            </div>
                            <div>
                                <Icon onClick={() => borrarItem(item.id)} icon="codicon:chrome-close" width='20px' /> 
                            </div>
                        </div>
                    </div>
                    )))
                    :
                    (<p>Todavía no agregaste productos al carrito</p>)
                    }
                    {
                        carrito.length !== 0 &&
                    (
                    <>
                        <div>
                            <p className='precioFinalCarrito'>Precio final ${precioTotal}</p>
                            <p className='precioFinalCarrito'>Precio final ${precioTotalUSD}</p>
                        </div>
                        <div className='mb-3'>
                            <div className='containerTotalCarrito'>
                                <Boton onClick={iniciarCompra} estilo="botonIniciarCompra botonAzul" texto="Iniciar compra" />
                            </div>
                        </div>
                    </>
                    )
                    }
                </div>
            </section>
        </main>
    )
}

export default Carrito