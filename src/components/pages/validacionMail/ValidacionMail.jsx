import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import base64 from 'base-64';
import Swal from 'sweetalert';

const ValidacionMail = () => {
    const ruta = useLocation();
    const redirect = useNavigate();
    const [code, setCode] = useState("");
    useEffect(() => {
        const pathname = ruta.pathname.split("/");
        setCode(pathname[2])
    }, [ruta]);

    

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
                        redirect(info.link)
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

    useEffect(() => {
        if (code !== "") {
            const dataDecoded = base64.decode(code);
            console.log ("DECODED: ", JSON.parse(dataDecoded));
            const fetchOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(JSON.parse (dataDecoded)),
            };
            fetch(`${process.env.REACT_APP_URL}/users`, fetchOptions)
                .then(res => {
                    if (res.status === 201) {
                        handleSwal({
                            title: "Te registraste con exito!",
                            icon: 'success',
                            buttons: 'Login',
                            link: `/Login`,
                            timer: ''
                        });
                    } else {
                        handleSwal({
                            title: "Ocurrió un error.",
                            text: "Este link ya fue utilizado.",
                            icon: 'error',
                            buttons: 'Cerrar',
                            link: `/`,
                            timer: ''
                        });
                    }
                })
        }
    }, [code]);



    return (
        <div>
            <p>
                {code}
            </p>
        </div>
    )
}

export default ValidacionMail