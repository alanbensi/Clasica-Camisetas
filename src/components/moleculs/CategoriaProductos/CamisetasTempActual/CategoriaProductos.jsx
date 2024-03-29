import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetchData } from "../../../hooks/useFetch";
import Cards from '../../atoms/cards/Cards';
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';
import './CategoriaProductos.css';


const CategoriaProductos = (props) => {
    const { fetchData, data, loading } = useFetchData(`/products/collections/${props.coleccion}`);

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <main>
            {loading ?
                (<LoadingSpinner />)
                :
                (<>
                    <h1 className='titCatProducto'>{props.tituloCatProducto}</h1>
                    <Container>
                        <Row>
                            {data.length !== 0 ? 
                                (data.map((camiseta) => (
                                    <Col className='cardMargin' lg={3} md={6} xs={6}>
                                        <Link to={`/Detalle-Camisetas/${camiseta.id}`} className='estiloLinks'>
                                            <Cards img={camiseta.images} titulo={camiseta.name} precio={camiseta.price} discount={camiseta.discount} />
                                        </Link>
                                    </Col>
                                )))
                                :
                                (
                                <p>Todavía no hay camisetas de esta colección</p>
                                )                                
                            }
                        </Row>
                    </Container>
                </>
                )
            }
        </main>
    )
}

export default CategoriaProductos