import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

const Filtrado = ({precioMenorMayor, precioMayorMenor, masAntiguo, masReciente, enOferta}) => {

    const [valorFilter, setValorFilter] = useState(valorFilter);    

    const handleValorFilter = (e) => {
        setValorFilter(e.target.value);
    }

    useEffect(() => {
        if (valorFilter === "1") {
            precioMenorMayor();
        } else if (valorFilter === "2") {
            precioMayorMenor();
        } else if (valorFilter === "3") {
            masAntiguo();
        }else if (valorFilter === "4") {
            masReciente()
        }else if (valorFilter === "5") {
            enOferta()
        }
    }, [valorFilter])

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