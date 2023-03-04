import React, { useContext } from 'react'
import Boton from '../boton/Boton'
import { useForm } from "react-hook-form"
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import { useState } from 'react';
import axios from "axios";
import './AdminAgregarCamisetas.css';

const AdminAgregarCamisetas = () => {
    const userContext = useContext(UserContext);
    const { token } = userContext;
    const { register, errors, handleSubmit } = useForm();

    const [images, setImages] = useState([]);
    const uploadedImages = [];

    const handleImageUpload = async (event) => {
        const files = event.target.files;

        for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', "5bcd2afec5e2a26686fd3a114b8419cc");

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload', formData);
            uploadedImages.push(response.data.data.display_url);
        } catch (error) {
            console.log(error);
        }
        }

        setImages([...images, ...uploadedImages]);
    };

    const redirect = useNavigate();
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

    const onSubmit = (data) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };
        fetch(`${process.env.REACT_APP_URL}/products`, fetchOptions)
            .then(res => res.json())
                .then(res=>{
                console.log ("hola", res);
                if (!res.error) {
                    handleSwal({
                        title: "El producto se agrego con exito!",
                        icon: 'success',
                        buttons: ['Cerrar', 'Ir a la camiseta'],
                        link: `/Detalle-Camisetas/${res.product.id}`,
                        timer: ''
                    });
                } else {
                    handleSwal({
                        title: "Ocurrió un error.",
                        text: "Asegurate de estar completando todos los campos!",
                        icon: 'error',
                        buttons: 'Cerrar',
                        link: `/admin/formularioCamisetas`,
                        timer: ''
                    });
                }
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombreCamiseta">Nombre del producto: </label>
            <input className='inputRegistrate formAdminCamisetas' name='name' type="text"  {...register("name")} />
            <label htmlFor="imgCamiseta">Imagen: </label>
            <div>
                <form>
                    <input className='inputRegistrate formAdminCamisetas' type="file" name="image" multiple onChange={handleImageUpload} />
                </form>
            </div>
            <div className='d-flex justify-content-evenly'>
                {images.map((image, index) => (
                    <img className='imgBB' key={index} src={image} alt={`Imagen${index}`} />
                ))}
            </div>
            <textarea className='inputRegistrate formAdminCamisetas' name='images' type="text" placeholder='Link de la camiseta agregada'  {...register("images")}>
                {uploadedImages}
            </textarea>
            <label htmlFor="descuentoCamiseta">Descuento: (Si no tiene descuento, poner 0) </label>
            <input className='inputRegistrate formAdminCamisetas' name='discount' type="number"  {...register("discount")}/>
            <label htmlFor="precioCamiseta">Precio: </label>
            <input className='inputRegistrate formAdminCamisetas' name='price' type="number" {...register("price")} />
            <label htmlFor="precioCamiseta">Precio en dolares: </label>
            <input className='inputRegistrate formAdminCamisetas' name='price_usd' type="number" {...register("price_usd")} />
            <label htmlFor="stockCamiseta">Stock: </label>
            <input className='inputRegistrate formAdminCamisetas' name='stock' type="number"  {...register("stock")}/>
            <div className='containerSelectFormAdmin formAdminCamisetas'>
                <label htmlFor="coleccion">Colección</label>
                <select name="collection" {...register("collection")} id="">
                    <option value="Camisetas temporada actual">Camisetas temporada actual</option>
                    <option value="Retros de coleccion">Retros de coleccion</option>
                    <option value="Entrenamiento y salidas">Entrenamiento y salidas</option>
                </select>
            </div>
            <label htmlFor="descripcionCamiseta">Descripcion: </label>
            <textarea className='inputRegistrate formAdminCamisetas' rows={8} name='description' type="text" {...register("description")} />
            <Boton estilo='botonAzul botonLogin' texto='Agregar producto' onClick={handleSubmit(onSubmit)} />
        </form>
    )
}

export default AdminAgregarCamisetas