import React, { useContext, useEffect } from 'react';
import Banner from '../../atoms/banner/Banner';
import Cards from '../../atoms/cards/Cards';
import { Container, Row, Col } from 'react-bootstrap';
import './Inicio.css';
import { Icon } from '@iconify/react';
import Slider from '../../moleculs/slider/Slider';
import Boton from '../../atoms/boton/Boton'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../atoms/loading/LoadingSpinner';
import { useFetchData } from "../../../hooks/useFetch";
import CategoriasInicioDesktop from '../../moleculs/CategoriasInicioDesktop/CategoriasInicioDesktop';
import { UserContext } from '../../context/UserContext';

const Inicio = () => {

    const userContext = useContext(UserContext);
    const { tokenDecode, userAdmin } = userContext;

    console.log(userContext);

    const { fetchData, data, loading } = useFetchData('/productsWithDiscount');

    const ofertasMobile = !data.error ? data.slice(0, 6) : [];
    const ofertasDesktop = !data.error  ? data.slice(0, 8) : [];

    useEffect(() => {
        fetchData();
    }, [])

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let vistaComputadora = mediaQuery.matches;

    return (
        <main>
            {loading ?
                (<LoadingSpinner />)
                :
                (<>
                    <Banner />
                    <h1 className='tituloInicio'>BIENVENIDOS A CLÁSICA 1905</h1>
                    {
                        vistaComputadora ?
                            (<CategoriasInicioDesktop />)
                            :
                            (<Slider />)
                    }
                    <div className='contenedorEnviosGratis'>
                        <Icon icon="carbon:delivery" width='32px' color='white' />
                        <p className='textoEnviosGratis'>Envios gratis a todo el pais</p>
                    </div>
                    <h2 className='titOfertasInicio'>OFERTAS</h2>
                    <Container>
                        <Row>
                            {data.length === 0 || data.error ?
                                (<p className='noHayOfertas'>Actualmente no hay productos en oferta. Podés buscar los productos deseados en su respectiva categoria.
                                </p>)
                                :
                                (vistaComputadora ?
                                    (
                                        ofertasDesktop.map((camiseta) => (
                                            <Col className='cardMargin' key={camiseta.id} lg={3} md={3} xs={6}>
                                                <Link to={`/Detalle-Camisetas/${camiseta.id}`} className='estiloLinks'>
                                                    <Cards img={camiseta.images} titulo={camiseta.name} precio={camiseta.price} discount={camiseta.discount} precioDolar={camiseta.price_usd} />
                                                </Link>
                                            </Col>
                                        )))
                                    :
                                    (
                                        ofertasMobile.map((camiseta) => (
                                            <Col className='cardMargin' key={camiseta.id} lg={3} md={3} xs={6}>
                                                <Link to={`/Detalle-Camisetas/${camiseta.id}`} className='estiloLinks'>
                                                    <Cards img={camiseta.images} titulo={camiseta.name} precio={camiseta.price} discount={camiseta.discount} precioDolar={camiseta.price_usd} />
                                                </Link>
                                            </Col>
                                        ))
                                    )
                                )
                            }
                        </Row>
                        {
                            data.length !== 0 &&
                            <Link to="/Productos/Ofertas" className='estiloLinks'>
                                <Boton estilo="botonAzul botonLogin" texto="Ver más ofertas" />
                            </Link>
                        }
                        {
                            userAdmin ?
                                (
                                    <Link to="/admin/formularioCamisetas" className='estiloLinks'>
                                        <Boton estilo="botonBlanco botonLogin" texto="Agregar productos" />
                                    </Link>
                                )
                                :
                                (null)
                        }
                    </Container>
                </>
                )
            }
        </main>
    )
}

export default Inicio