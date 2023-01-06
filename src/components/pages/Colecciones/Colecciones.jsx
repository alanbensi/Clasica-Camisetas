import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useFetchData } from "../../../hooks/useFetch";
import Banner from '../../atoms/banner/Banner';
import Cards from '../../atoms/cards/Cards';
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';
import Filtrado from '../../moleculs/filtrado/Filtrado';
import './Colecciones.css';


const Colecciones = () => {

    const {nombreColeccion} = useParams ();
    let url; 

    if (nombreColeccion === "Ofertas") {
        url='/productsWithDiscount';
    } else if (nombreColeccion === "Todos los productos") {
        url='/products';
    } else {
        url=`/products/collections/${nombreColeccion}`;
    }
    

    const { fetchData, data, loading } = useFetchData (url);

    const [Info, setInfo] = useState([]);

    useEffect(() => {
        fetchData();
    }, [url])
    
    useEffect(() => {
        setInfo(data); 
    }, [data])

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let vistaComputadora = mediaQuery.matches;

    const calculoPrecioTotal = (price, discount) => {
        const calculoDescuento = (parseInt(discount) * parseInt(price)) / 100;
        return parseInt(price) - calculoDescuento;
    }

    const precioMenorMayor = ()=> {
        if (Info.length > 0) {
            let _informacion = Info.length === data.length ? [...Info] : data;
            _informacion.sort((p1, p2) => (calculoPrecioTotal(p1.price, p1.discount) > calculoPrecioTotal(p2.price, p2.discount)) ? 1 : (calculoPrecioTotal(p1.price, p1.discount) < calculoPrecioTotal(p2.price, p2.discount)) ? -1 : 0);
            setInfo(_informacion);
        }
    }

    const precioMayorMenor = () => {
        if (Info.length > 0) {
            let _informacion = Info.length === data.length ? [...Info] : data;
            _informacion.sort((p1, p2) => (calculoPrecioTotal(p1.price, p1.discount) < calculoPrecioTotal(p2.price, p2.discount)) ? 1 : (calculoPrecioTotal(p1.price, p1.discount) > calculoPrecioTotal(p2.price, p2.discount)) ? -1 : 0);
            setInfo(_informacion);
        }
    }

    const masAntiguo = () => {
        if (Info.length > 0) {
            let _informacion = Info.length === data.length ? [...Info] : data;
            _informacion.sort((p1, p2) => (p1.created_at) > (p2.created_at) ? 1 : (p1.created_at) < (p2.created_at) ? -1 : 0);
            setInfo(_informacion);
        }
    }

    const masReciente = () => {
        if (Info.length > 0) {
            let _informacion = Info.length === data.length ? [...Info] : data;
            _informacion.sort((p1, p2) => (p1.created_at) < (p2.created_at) ? 1 : (p1.created_at) > (p2.created_at) ? -1 : 0);
            setInfo(_informacion);
        }
    }

    const enOferta = () => {
        if (Info.length > 0) {
            let _informacion = [...Info]
            const newArray = _informacion.filter(oferta=> parseInt(oferta.discount) > 0);
            console.log('en oferta ', newArray)
            setInfo(newArray);
        }
    }

    return (
        <main>
            {vistaComputadora &&
                <section>
                    <Banner />
                </section>
            }
            {loading ?
                (<LoadingSpinner />)
                :
                (
                    <div className='divContainerProductos'>
                        <div className='divBreadcrumb d-flex mt-2'>
                            <Link className='breadcrumb' to='/'>Inicio {'>'}</Link>
                            {
                                nombreColeccion === "Todos los productos" ? 
                                (<p className='breadcrumb px-1'>{nombreColeccion}</p>)
                                :
                                (
                                <>
                                    <Link className='breadcrumb px-1' to='/Productos/Todos los productos'>Productos {'>'}</Link>
                                    <p className='breadcrumb px-1'> {nombreColeccion}</p>
                                </>
                                )
                            }
                        </div>
                        <h1 className='titTempActual'>{nombreColeccion}</h1>
                        <Filtrado 
                            precioMenorMayor={precioMenorMayor}
                            precioMayorMenor={precioMayorMenor}
                            masAntiguo={masAntiguo}
                            masReciente={masReciente}
                            enOferta={enOferta}
                        />
                        <Container className='mt-3'>
                            <Row>
                                {Info.length > 0 ?
                                    (Info.map((camiseta) => (
                                        <Col className='cardMargin' key={camiseta.id} lg={3} md={3} xs={6}>
                                            <Link to={`/Detalle-Camisetas/${camiseta.id}`} className='estiloLinks'>
                                                <Cards img={camiseta.images} titulo={camiseta.name} precio={camiseta.price} discount={camiseta.discount} precioDolar={camiseta.price_usd} />
                                            </Link>
                                        </Col>
                                    )))
                                    :
                                    (<p className='noHayProductos'>Todavía no hay camisetas de esta colección</p>)
                                }
                            </Row>
                        </Container>
                    </div>
                )
            }
        </main>
    )
}

export default Colecciones;