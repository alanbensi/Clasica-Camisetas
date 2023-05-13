import React, { useContext, useEffect } from 'react';
import Boton from '../boton/Boton';
import { useForm } from "react-hook-form";
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import axios from "axios";

const AdminEditarCamiseta = (props) => {

    const userContext = useContext(UserContext);
    const { token } = userContext;
    const {register, errors, handleSubmit} = useForm();    

    const [urlImg, setUrlImg] = useState(props.images?(props.images.join(",")):(""));
    const [images, setImages] = useState([urlImg]);
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
                setUrlImg(uploadedImages.join(","))
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
                        redirect(info.link2);
                    } else {
                        redirect(info.link);
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
        data.images = urlImg;
        const fetchOptions = {
            method: 'PUT',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };
        fetch(`${process.env.REACT_APP_URL}/products/${props.id}`, fetchOptions)
            .then(res => {
                if(res.status !== 400){
                    handleSwal({
                        title: "El producto se modifico con exito!",
                        icon: 'success',
                        buttons: ['Cerrar', 'Ir a la camiseta'],
                        link: "/",
                        link2: `/Detalle-Camisetas/${props.id}`,
                        timer: ''
                    });
                }else{
                    console.log (res.status, "ABCDEF")
                    handleSwal({
                        title: "Ocurrió un error.",
                        text: "Asegurate de estar completando todos los campos y que el producto no tenga un nombre que ya haya sido utilizado!",
                        icon: 'error',
                        link: `/Detalle-Camisetas/${props.id}`,
                        buttons: 'Cerrar',
                        timer: ''
                    });
                }
            })
    }

    const eliminarIMG = (index)=> {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        setUrlImg(newImages.join('\n'));
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="nombreCamiseta">Nombre del producto: </label>
            <input className='inputRegistrate formAdminCamisetas' name='name' type="text" placeholder='Nombre del producto...' defaultValue={props.name} {...register("name")} />
            <label htmlFor="imgCamiseta">Imagen: </label>
            <div>
                <form>
                    <input className='inputRegistrate formAdminCamisetas inputImagenes' multiple type="file" name="image" onChange={handleImageUpload} />
                </form>
            </div>
            <div className='contenedorMiniImagenes'>
                {images.map((image, index) => (
                    <div className='contenedorMiniImg'>
                        <img className='imgBB' key={image} src={image} alt={`Imagen${index}`} />
                        <Icon className='iconoEliminarMiniImg' onClick={()=>eliminarIMG(index)} icon="mdi:trash-can-circle" />
                    </div>
                ))}
            </div>
            <textarea className='inputRegistrate formAdminCamisetas textAreaAgregarCamiseta' name='images' type="text" placeholder='Link de la camiseta agregada' value={urlImg} {...register("images")} readOnly></textarea>
            <label htmlFor="descuentoCamiseta">Descuento: (Si no tiene descuento, poner 0) </label>
            <input className='inputRegistrate formAdminCamisetas' name='discount' type="number" placeholder='Descuento...' defaultValue={props.discount} {...register("discount")} />
            <label htmlFor="precioCamiseta">Precio: </label>
            <input className='inputRegistrate formAdminCamisetas' name='price' type="number" placeholder='Precio...' defaultValue={props.price} {...register("price")} />
            <label htmlFor="precioCamiseta">Precio en dolares: </label>
            <input className='inputRegistrate formAdminCamisetas' name='price_usd' type="number" placeholder='Precio en dolares...' defaultValue={props.price_usd} {...register("price_usd")} />
            <label htmlFor="stockCamiseta">Año: </label>
            <input className='inputRegistrate formAdminCamisetas' name='year' type="number" placeholder='Año' defaultValue={props.year} {...register("year")} />
            <label htmlFor="stockCamiseta">Stock: </label>
            <input className='inputRegistrate formAdminCamisetas' name='stock' type="number" placeholder='Stock...' defaultValue={props.stock} {...register("stock")} />
            <div className='containerSelectFormAdmin formAdminCamisetas'>
                <label htmlFor="coleccion">Colección</label>
                <select name="collection" id="" defaultValue={props.collection} {...register("collection")}>
                    <option value="Camisetas temporada actual">Camisetas temporada actual</option>
                    <option value="Retros de coleccion">Retros de coleccion</option>
                    <option value="Entrenamiento y salidas">Entrenamiento y salidas</option>
                </select>
            </div>
            <label htmlFor="descripcionCamiseta">Descripcion: </label>
            <textarea className='inputRegistrate formAdminCamisetas' rows={8} name='description' type="text" placeholder='Descripcion...' defaultValue={props.description} {...register("description")} />
            <Boton estilo='botonAzul botonLogin' onClick={handleSubmit(onSubmit)} texto='Editar producto' />
        </form>
    )
}

export default AdminEditarCamiseta