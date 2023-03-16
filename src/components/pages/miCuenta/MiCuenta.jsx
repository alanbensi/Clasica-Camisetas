import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useFetchData } from '../../../hooks/useFetch';
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';
import { UserContext } from '../../context/UserContext';
import './MiCuenta.css';


const MiCuenta = () => {

    const {id} = useParams(); 
    console.log (id, "pepe"); 

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const sinEspacios = ruta.pathname.replace(/-/g, " ");
        setTitulo(sinEspacios.replace("/", " "));
    }, [ruta]);

    const userContext = useContext(UserContext);
    const { token } = userContext;

    const { fetchData:getInfoUser, data:dataUser, loading:loadingUser } = useFetchData('/users', token);

    useEffect(() => {
        getInfoUser();
    }, []);

    useEffect (() => {
        console.log (dataUser);
    },[dataUser])

    const { fetchData: getInfoOrders, data: dataOrders , loading: loadingOrders } = useFetchData('/orders', token);

    useEffect(() => {
        getInfoOrders();
    }, []);

    useEffect(() => {
        console.log(dataOrders);
    }, [dataOrders])

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    
    function formatDate(date) {
        const fecha = new Date (date);
        return [
            padTo2Digits(fecha.getDate()),
            padTo2Digits(fecha.getMonth() + 1),
            fecha.getFullYear(),
        ].join('/');
    }
    

    return (
        <main className='px-3'>
            <section className='d-flex mt-3 mb-2'>
                <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                <p className='breadcrumb ms-1'>Mi cuenta</p>
            </section>
            <section>
                <div className='d-flex justify-content-between'>
                    <h2 className='titulosMiCuenta'>MIS DATOS</h2>
                    <OverlayTrigger placement={"bottom"} overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                Editar datos
                            </Tooltip>
                        }
                    >
                        <Link className='estiloLinks' to={`/Editar-mi-cuenta/${id}`}>
                            <Icon icon="el:pencil-alt" className='editarMiCuenta' />
                        </Link>
                    </OverlayTrigger>
                </div>
                {
                    loadingUser ? 
                    (<LoadingSpinner/>)
                    :
                    (
                    <div>
                        <p>Nombre y apellido: {dataUser.fullname}</p>
                        <p>Email: {dataUser.email}</p>
                        <p>Telefono: {dataUser.phone}</p>
                    </div>
                    )
                }
                
                <div>
                    <h2 className='titulosMiCuenta'>MIS COMPRAS</h2>
                    {!dataOrders.error ?
                    (
                        <table className='tablaCompras'>
                            <tr>
                                <th>Pedido</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Ver más</th>
                            </tr>
                            {
                                dataOrders.map ((item)=>(
                                    <tr>
                                        <td>#{item.id}</td>
                                        <td>{formatDate(item.created_at)}</td>
                                        <td>{item.payment === "mp" ? `$${item.total}`: `USD${item.total_USD}`}</td>
                                        <td><Icon icon="clarity:eye-line" className='iconoVerMas' /></td>                                    
                                    </tr>
                                ))
                            }
                        </table>
                    )
                    :
                    (
                        <p>Todavía no realizaste ninguna compra <span role="img" aria-label='icono de cara triste'>😥</span> </p>
                    )
                    }
                </div>
                {/* <div>
                    <h2 className='titulosMiCuenta'>MIS SUBASTAS</h2>
                    {subastasRealizadas? (
                        <table className='tablaCompras'>
                            <tr>
                                <th>Pedido</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>#{subastasRealizadas.numeroSubasta}</td>
                                <td>{subastasRealizadas.fechaSubasta}</td>
                                <td>${subastasRealizadas.ofertaSubasta}</td>
                                <td><Icon icon="clarity:eye-line" className='iconoVerMas'/></td>
                            </tr>
                        </table>
                    )
                    :
                    (
                        <p>Todavía no realizaste ofertas en subastas <span role="img" aria-label='icono de cara triste'>😥</span></p>
                    )
                    }
                </div> */}
            </section>
        </main>
    )
}

export default MiCuenta