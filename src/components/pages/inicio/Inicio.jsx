import React, { useEffect } from 'react';
import Banner from '../../atoms/banner/Banner';
import Cards from '../../atoms/cards/Cards';
import {Container, Row, Col} from 'react-bootstrap';
import './Inicio.css';
import { Icon } from '@iconify/react';
import Slider from '../../moleculs/slider/Slider';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';
import { useFetchData } from "../../../hooks/useFetch";


const Inicio = () => {

    const { fetchData, data, loading } = useFetchData('/productsWithDiscount');

    useEffect(() => {
        fetchData();
    }, [])
    


    return (
        <main>
            {loading ? 
                (<LoadingSpinner/>) 
            : 
                (<>
                    <Banner />
                    <h1 className='tituloInicio'>BIENVENIDOS A CLÁSICA 1905</h1>
                    <Slider />
                    <div className='contenedorEnviosGratis'>
                        <Icon icon="carbon:delivery" width='32px' color='white' />
                        <p className='textoEnviosGratis'>Envios gratis a todo el pais</p>
                    </div>
                    <h2 className='titOfertasInicio'>OFERTAS</h2>
                    <Container>
                        <Row>
                            {data &&
                                data.map((camiseta)=> (
                                    <Col className='cardMargin' lg={3} md={6} xs={6}>
                                        <Link to={`/Detalle-Camisetas/${camiseta.id}`} className='estiloLinks'>
                                            <Cards img={camiseta.images} titulo= {camiseta.name} precio={camiseta.price} discount={camiseta.discount} />
                                        </Link>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </>
                )
            }
        </main>
    )
}

export default Inicio