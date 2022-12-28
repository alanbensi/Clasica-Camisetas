import { Icon } from '@iconify/react';
import React, { useContext, useState } from 'react';
import './DetalleDeCompra.css'
import iconoMP from '../../../assets/LOGO Mercado-Pago.png'
import iconoPaypal from '../../../assets/LOGO Paypal.png'
import Boton from '../../atoms/boton/Boton'
import ModalBootstrap from '../../moleculs/ModalBootstrap/ModalBootstrap';
import ModalDetalleCompra from '../../atoms/ModalDetalleCompra/ModalDetalleCompra';
import { UserContext } from '../../context/UserContext';
import { useEffect } from 'react';
import Swal from 'sweetalert';
import { useFetchData } from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const DetalleDeCompra = () => {

    const [envio, setEnvio] = useState("");
    const envioDomicilio = (e) => {
        setEnvio(e.target.value);
    }

    const [pais, setPais] = useState("");
    const paisDomicilio = (e) => {
        setPais(e.target.value);
    }
    
    const [billetera, setBilletera] = useState ("");
    const billeteraVirtual = (e) => {
        setBilletera (e.target.value);
    }


    const userContext = useContext(UserContext);
    const {token} = userContext;

    const { fetchData: getInfoUser, data: dataUser, loading: loadingUser } = useFetchData('/users', token);

    useEffect(() => {
        getInfoUser();
    }, []);

    useEffect(() => {
        console.log(dataUser, "hola")
    }, [dataUser]);

    const [total, setTotal] = useState(0);
    const [totalUSD, setTotalUSD] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [address, setAddress] = useState("");
    const [order_items, setOrder_items] = useState([]);
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [CP, setCP] = useState("");
    const [sucursal, setSucursal] = useState (""); 


    const carritoLocal = JSON.parse(localStorage.getItem('Carrito'));

    useEffect(() => {
        const idArray = carritoLocal.map(item => ({
            "product_id": item.id, 
            "quantity": item.cantidad
        }))
        setOrder_items(idArray);
        console.log (idArray, "ID");
    }, [])
    
    useEffect(() => {
        let sumaTotal = 0;
        let sumaTotalUSD = 0;
        carritoLocal.forEach(camiseta => {
            if (billetera === "mercado pago") {
                sumaTotal += camiseta.precioFinal;
                console.log("SEEEEEEEEE")
            } else {
                sumaTotalUSD += camiseta.price_usd;
            }
        });
        if (billetera === "mercado pago") {
            setTotal(sumaTotal);
        } else if(billetera === "paypal") {
            setTotalUSD(sumaTotalUSD);
        }
    }, [billetera])

    const handleEnviarPedido = ()=> {
        if (envio === "Domicilio") {
            setAddress(direccion + "," + ciudad + "," + provincia + "-" + CP);
        } else {
            setAddress(sucursal);
        }
    }

    useEffect(() => {
        if (address.length >0) {
            onSubmit(
                {
                    "order": {
                        "total": total,
                        "totalUsd": totalUSD,
                        "payment": billetera,
                        "address": address
                    },
                    "order_items": order_items
                }
            )
        }
    }, [address]);
    

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
    
    const onSubmit = (data) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };
        fetch(`http://127.0.0.1:3001/orders`, fetchOptions)
            .then(res => {
                if (res.status === 201) {
                    handleSwal({
                        title: "La compra se realizó con exito",
                        text: "En las proximas horas, te estará llegando un codigo de seguimiento via mail para ver el estado de tu compra!",
                        icon: 'success',
                        buttons: ['Cerrar', 'Inicio'],
                        link: "/Detalle-de-compra",
                        link2: "/",
                        timer: ''
                    });
                } else {
                    handleSwal({
                        title: "Ocurrió un error creando la orden!",
                        text: "Por favor envianos a Whatsapp una captura del comprobante de pago y los productos que adquiriste!",
                        icon: 'error',
                        buttons: 'Cerrar',
                        link: `/`,
                        timer: ''
                    });
                }
            })
    }

    return (
        <main>
            <section>
                <ModalBootstrap clase='botonModal' textoBoton='Ver detalles del pedido' titulo='Detalle de pedido' contenido={<ModalDetalleCompra />} icono={true} />
            </section>
            <section className='mx-3'>
                <div>
                    <h1 className='tituloDetallesCompra mb-3'>Detalles de facturación</h1>
                    <h2 className='fontSizeDetalleCompra subtituloDetallesCompra'>Completá con tus datos para ver las opciones de envío.</h2>
                    <p className='fontSizeDetalleCompra'>(*) Estos datos son obligatorios</p>
                </div>
                <div>
                    <form action="" className='formularioDetalleCompra'>
                        <label htmlFor="nombreDetallePedido">NOMBRE *</label>
                        <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu nombre...' defaultValue={dataUser.name} />
                        <label htmlFor="apellidosDetallePedido">APELLIDOS *</label>
                        <input required type="text" name="apellidosetallePedido" id="apellidosDetallePedido" placeholder='Ingresá tus apellidos...' defaultValue={dataUser.surname} />
                        <label htmlFor="correoDetallePedido">CORREO ELECTRÓNICO *</label>
                        <input required type="email" name="correoDetallePedido" id="correoDetallePedido" placeholder='Ingresá tu correo electrónico...' />
                        <label htmlFor="telefonoDetallePedido">TELEFONO *</label>
                        <input required type="number" name="telefonoDetallePedido" id="telefonoDetallePedido" placeholder='Ingresá tu número de teléfono...' defaultValue={dataUser.phone} />
                        <label htmlFor="dniDetallePedido">DNI *</label>
                        <input required type="number" name="dniDetallePedido" id="dniDetallePedido" placeholder='Ingresá tu número de DNI...' />
                        <label htmlFor="cuitDetallePedido">CUIT/CUIL *</label>
                        <input required type="number" name="cuitDetallePedido" id="cuitDetallePedido" placeholder='Ingresá tu número de CUIT/CUIL...' />
                        <label htmlFor="cpDetallePedido">CODIGO POSTAL *</label>
                        <input required type="text" name="cpDetallePedido" id="cpDetallePedido" placeholder='Ingresá tu número de CP...' onChange={(e)=> setCP(e.target.value)} />
                        <a className='mb-4' href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer">No conozco mi código postal</a>
                        <div>
                            <label htmlFor="pais" className='d-block'>PAÍS *</label>
                            <select name="" id="">
                                <option value="argentina" onChange={paisDomicilio}>Argentina</option>
                                <option value="OtroPais" onChange={paisDomicilio}>Otro pais</option>
                            </select>
                        </div>
                        <label htmlFor="envioDetallePedido">ENVIO *</label>
                        <div className='d-flex align-items-center'>
                            <input required className='radioDetallePedido me-3' type="radio" value="Domicilio" name="envioDetallePedido" id="envioDomicilio" onChange={envioDomicilio} />
                            Envío a domicilio
                        </div>
                        <div>
                            <input required className='radioDetallePedido me-3' type="radio" value="Sucursal" name="envioDetallePedido" id="envioCorreoArgentino" onChange={envioDomicilio}  />
                            Retiro en sucursal de Correo Argentino
                        </div>
                        {envio === "Domicilio" &&
                            <div className='contenedorEnvioDomicilio'>
                                <h2 className='tituloDetallesCompra mb-3'>Envío a domicilio</h2>
                                <label htmlFor="nombreDetallePedido">DIRECCIÓN *</label>
                                <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu dirección...' onChange={(e) => setDireccion(e.target.value)} />
                                <label htmlFor="nombreDetallePedido">CIUDAD *</label>
                                <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu ciudad...' onChange={(e) => setCiudad(e.target.value)} />
                                <label htmlFor="nombreDetallePedido">PROVINCIA *</label>
                                <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu provincia...' onChange={(e) => setProvincia(e.target.value)} />
                            </div>
                        }
                        {
                            envio === "Sucursal" &&
                            <div className='mt-3'>
                                <a href="https://www.correoargentino.com.ar/formularios/sucursales" target="_blank" rel="noopener noreferrer">Ver las sucursales de Correo Argentino</a>
                                <div className='mt-3'>
                                    <label htmlFor="">Por favor escribinos tu sucursal más cercana: </label>
                                    <input type="text" onChange={(e) => setSucursal(e.target.value)} />
                                </div>
                            </div>
                        }
                    </form>
                    {
                        pais === "argentina" &&
                        <div>
                            <h2 className='tituloMercadoPago'>Método de pago</h2>
                            <div className=''>
                                <div className='d-flex align-items-center'>
                                    <input required className='radioDetallePedido me-3' type="radio" value="mercado pago" name="billeteraVirtual" id="mercadoPago" onChange={billeteraVirtual} />
                                    <img className='logoMercadoPago' src={iconoMP} alt="Mercado pago" />
                                </div>
                                <div>
                                    <input required className='radioDetallePedido me-3' type="radio" value="paypal" name="billeteraVirtual" id="paypal" onChange={billeteraVirtual} />
                                    <img className='logoMercadoPago' src={iconoPaypal} alt="Paypal" />
                                </div>
                            </div>                        
                        </div>
                    } 
                </div>
            </section>
            <section className='containerMercadoPagoCompra'>
                <div className='containerIconosMP'>
                    <Icon className='iconosDetalleCompra' icon="iconoir:select-window"></Icon>
                    <Icon className='flechaMP' icon="bi:arrow-right" />
                    <Icon className='iconosDetalleCompra' icon="arcticons:mercado-libre"></Icon>
                </div>
                <p className='textoMPDetalle'>Te llevamos a nuestro sitio para completar el pago</p>
            </section>
            <section className='mx-3'>
                <p className='textoTerminosCondiciones'>Al continuar, aceptas nuestros <a className='terminosCondiciones' href="/">Términos y Condiciones</a></p>
                <Boton estilo="botonNav botonAzul botonDetalleCompra" onClick= {handleEnviarPedido} texto="Realizar el pedido"></Boton>
                <p>Sus datos personales se utilizarán para procesar su pedido y respaldar su experiencia en este sitio web.</p>
            </section>
        </main>
    )
}

export default DetalleDeCompra