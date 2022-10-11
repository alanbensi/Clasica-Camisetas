import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useFetchData } from "../../../hooks/useFetch";
import Banner from '../../atoms/banner/Banner';
import Cards from '../../atoms/cards/Cards';
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';
import './CamisetasTempActual.css';


const CamisetasTempActual = () => {
    const { fetchData, data, loading } = useFetchData(`/products/collections/Camisetas temporada actual`);

    useEffect(() => {
        fetchData();
    }, [])

    const ruta = useLocation();
    const [titulo, setTitulo] = useState("");
    useEffect(() => {
        const rutaSinBarra = ruta.pathname.replace("/", " ");
        setTitulo(rutaSinBarra);
    }, [ruta]);

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let vistaComputadora = mediaQuery.matches;
    
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
                        <p className='ms-1 tituloAyuda'>{titulo}</p>
                    </div>
                    <h1 className='titTempActual'>Camisetas de la temporada actual</h1>
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

export default CamisetasTempActual