import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

const Filtrado = ({precioMenorMayor}) => {

    const [valorFilter, setValorFilter] = useState(valorFilter);    

    const handleValorFilter = (e) => {
        setValorFilter(e.target.value);
    }

    useEffect(() => {
        console.log(valorFilter);
    }, [valorFilter])
    
    switch (valorFilter) {
        case "1": 
            precioMenorMayor();
            break;
        case "2":
            console.log("case 2");
            break;
    }

    return (
        <Form.Select onChange={handleValorFilter}>
            <option>Filtrar</option>
            <option value="1">Precio: Menor a mayor</option>
            <option value="2">Precio: Mayor a menor</option>
            <option value="3">Fecha de carga: Más antiguos</option>
            <option value="4">Fecha de carga: Más recientes</option>
            <option value="5">En oferta</option>
        </Form.Select>
    )
}

export default Filtrado