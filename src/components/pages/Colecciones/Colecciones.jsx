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

    useEffect(() => {
        fetchData();
    }, [url])
    
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let vistaComputadora = mediaQuery.matches;

    // const [listado, setListado] = useState([])
    
    // useEffect(() => {
    //     const test = async()=>{
    //         await fetchData();
    //         setListado(data);
    //     }
    //     test(); 
    // }, [nombreColeccion])
    
    // const precioMenorMayor = ()=> {
    //     console.log ("hola", listado);
    //     const listaOrdenada = [...data].sort((a, b) => {
    //         return a.price > b.price ? 1:-1
    //     })
    //     debugger
    //     setListado(listaOrdenada);
    // }

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
                        <Filtrado />
                        <Container className='mt-3'>
                            <Row>
                                {data.length !== 0 ?
                                    (data.map((camiseta) => (
                                        <Col className='cardMargin' key={camiseta.id} lg={3} md={3} xs={6}>
                                            <Link to={`/Detalle-Camisetas/${camiseta.id}`} className='estiloLinks'>
                                                <Cards img={camiseta.images} titulo={camiseta.name} precio={camiseta.price} discount={camiseta.discount} />
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