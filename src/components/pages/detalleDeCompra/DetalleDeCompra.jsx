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
import { SwitchDivisaContext } from '../../context/SwitchDivisaContext';
import { useForm } from 'react-hook-form';

const DetalleDeCompra = () => {

    const [envio, setEnvio] = useState("");
    const envioDomicilio = (e) => {
        setEnvio(e.target.value);
    }

    const [pais, setPais] = useState("");
    const paisDomicilio = (e) => {
        console.log (e.target.value, "select")
        setPais(e.target.value);
    }
    
    const [billetera, setBilletera] = useState ("mp");
    const billeteraVirtual = (e) => {
        setBilletera (e.target.value);
    }


    const userContext = useContext(UserContext);
    const {token} = userContext;

    const switchDivisa = useContext(SwitchDivisaContext);
    const { switchDivisaContexto } = switchDivisa; 

    const { fetchData: getInfoUser, data: dataUser, loading: loadingUser } = useFetchData('/users', token);

    useEffect(() => {
        getInfoUser();
    }, []);

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
            if (billetera === "mp") {
                sumaTotal += camiseta.precioFinal;
                console.log("SEEEEEEEEE")
            } else {
                sumaTotalUSD += camiseta.price_usd;
            }
        });
        if (!switchDivisaContexto) {
            setTotal(sumaTotal);
        } else {
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
                    localStorage.removeItem("Carrito");
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
        
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            phone: ""
        }
    });  
    console.log(errors, "Errores en detalle de compra.");
        
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        if (dataUser.name) {
            setUserName(dataUser.name);
            setUserSurname(dataUser.surname);
            setUserPhone(dataUser.phone);
            setUserEmail (dataUser.email)
        }
    }, [dataUser]);

    useEffect(() => {
        if (userName && userSurname && userPhone && userEmail) {
            reset({
                name: userName,
                surname: userSurname,
                phone: userPhone,
                email: userEmail
            })
        }
    }, [userName, userSurname, userPhone, userEmail]);


    return (
        <main>
            <section>
                <ModalBootstrap clase='botonModal' textoBoton='Ver detalles del pedido' titulo='Detalle de pedido' total={total} totalUSD={totalUSD} contenido={<ModalDetalleCompra />} icono={true} />
            </section>
            <section className='mx-3'>
                <div>
                    <h1 className='tituloDetallesCompra mb-3'>Detalles de facturación</h1>
                    <h2 className='fontSizeDetalleCompra subtituloDetallesCompra'>Completá con tus datos para ver las opciones de envío.</h2>
                    <p className='fontSizeDetalleCompra'>(*) Estos datos son obligatorios</p>
                </div>
                <div>
                    <form action="" className='formularioDetalleCompra' onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="nombreDetallePedido">NOMBRE *</label>
                        <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu nombre...'  {...register("name", { required: true })} />
                        {errors.name ? (<p className='erroresForm mb-3'>Este campo es obligatorio.</p>) : ("")}
                        <label htmlFor="apellidosDetallePedido">APELLIDOS *</label>
                        <input required type="text" name="apellidosetallePedido" id="apellidosDetallePedido" placeholder='Ingresá tus apellidos...' {...register("surname", { required: true })} />
                        {errors.surname ? (<p className='erroresForm mb-3'>Este campo es obligatorio.</p>) : ("")}
                        <label htmlFor="correoDetallePedido">CORREO ELECTRÓNICO *</label>
                        <input required type="email" name="correoDetallePedido" id="correoDetallePedido" placeholder='Ingresá tu correo electrónico...'  className={dataUser.email ? "readOnlyInput" : ""} {...register("email", { required: true, pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ } })} />
                        {errors.email && errors.email.type === "required" ? (<p className='erroresForm mb-3'>Este campo es obligatorio.</p>) : ("")}
                        {errors.email && errors.email.type === "pattern" ? (<p className='erroresForm mb-3'>El formato del mail es incorrecto.</p>) : ("")}
                        <label htmlFor="telefonoDetallePedido">TELEFONO *</label>
                        <input required type="number" name="telefonoDetallePedido" id="telefonoDetallePedido" placeholder='Ingresá tu número de teléfono...'  {...register("phone", { required: true })} />
                        {errors.phone ? (<p className='erroresForm mb-3'>Este campo es obligatorio.</p>) : ("")}
                        <label htmlFor="dniDetallePedido">DNI *</label>
                        <input required type="number" name="dniDetallePedido" id="dniDetallePedido" placeholder='Ingresá tu número de DNI...' {...register("dni", { required: true })} />
                        {errors.dni ? (<p className='erroresForm mb-3'>Este campo es obligatorio.</p>) : ("")}
                        <label htmlFor="cuitDetallePedido">CUIT/CUIL *</label>
                        <input required type="number" name="cuitDetallePedido" id="cuitDetallePedido" placeholder='Ingresá tu número de CUIT/CUIL...' {...register("cuit", { required: true })} />
                        {errors.cuit ? (<p className='erroresForm mb-3'>Este campo es obligatorio.</p>) : ("")}
                        <label htmlFor="cpDetallePedido">CODIGO POSTAL *</label>
                        <input required type="text" name="cpDetallePedido" id="cpDetallePedido" placeholder='Ingresá tu número de CP...' onChange={(e) => setCP(e.target.value)} {...register("postalCode", { required: true })} />
                        <a className='mb-4' href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer">No conozco mi código postal</a>
                        <label htmlFor="envioDetallePedido">ENVIO *</label>
                        <div className='d-flex align-items-center' {...register("envio", { required: true })}>
                            <input required className='radioDetallePedido me-3' type="radio" value="Domicilio" name="envioDetallePedido" id="envioDomicilio" onChange={envioDomicilio} />
                            Envío a domicilio
                        </div>
                        <div>
                            <input required className='radioDetallePedido me-3' type="radio" value="Sucursal" name="envioDetallePedido" id="envioCorreoArgentino" onChange={envioDomicilio}  />
                            Retiro en sucursal de Correo Argentino
                        </div>
                        {errors.envio ? (<p className='erroresForm mb-3'>Este campo es obligatorio.</p>) : ("")}
                        {envio === "Domicilio" &&
                            <div className='contenedorEnvioDomicilio'>
                                <h2 className='tituloDetallesCompra mb-3'>Envío a domicilio</h2>
                                <label htmlFor="nombreDetallePedido">DIRECCIÓN *</label>
                                <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu dirección...' onChange={(e) => setDireccion(e.target.value)} {...register("direccion", { required: true })} />
                                <label htmlFor="nombreDetallePedido">CIUDAD *</label>
                                <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu ciudad...' onChange={(e) => setCiudad(e.target.value)} {...register("ciudad", { required: true })} />
                                <label htmlFor="nombreDetallePedido">PROVINCIA *</label>
                                <input required type="text" name="nombreDetallePedido" id="nombreDetallePedido" placeholder='Ingresá tu provincia...' onChange={(e) => setProvincia(e.target.value)} {...register("provincia", { required: true })} />
                            </div>
                        }
                        {
                            envio === "Sucursal" &&
                            <div className='mt-3'>
                                <a href="https://www.correoargentino.com.ar/formularios/sucursales" target="_blank" rel="noopener noreferrer">Ver las sucursales de Correo Argentino</a>
                                <div className='mt-3'>
                                    <label htmlFor="">Por favor escribinos tu sucursal más cercana: </label>
                                    <input type="text" onChange={(e) => setSucursal(e.target.value)} placeholder="Sucursal... " {...register("sucursalCorreo", { required: true })} />
                                </div>
                            </div>
                        }
                    </form>
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
                <Boton estilo="botonNav botonAzul botonDetalleCompra"  onClick={handleSubmit(onSubmit)} texto="Realizar el pedido" />
                <p>Sus datos personales se utilizarán para procesar su pedido y respaldar su experiencia en este sitio web.</p>
            </section>
        </main>
    )
}

export default DetalleDeCompra