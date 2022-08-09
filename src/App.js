import React from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './components/pages/inicio/Inicio';
import NavClasica from './components/moleculs/navClasica/NavClasica'; 
import Footer from './components/moleculs/footer/Footer';
import VendeTuCamiseta from './components/pages/vende-tu-camiseta/VendeTuCamiseta.jsx';
import Login from './components/pages/login/Login';
import Registrate from './components/pages/registrate/Registrate';
import RestablecerContraseña from './components/pages/restablecerContraseña/RestablecerContraseña';


function App() {
  return (
    <>
      <NavClasica />
      <Routes>
        <Route exact path='/Login' element = {<Login />} />
        <Route exact path='/Registrate' element={<Registrate />} />
        <Route exact path='/' element= {<Inicio />} />
        <Route exact path='/Restablecer-Contrasena' element={<RestablecerContraseña />} />
        {/* <Route exact path='/productos' element= {<Productos />} /> */}
        {/* <Route exact path='/subastas' element= {<Subastas />} /> */}
        <Route exact path='/Vende-tu-camiseta' element= {<VendeTuCamiseta />} />
        {/* <Route exact path='/nosotros' element= {<Nosotros />} /> */}
        {/* <Route exact path='/ayuda' element= {<Ayuda />} /> */}
        {/* <Route exact path='/carrito' element= {<Carrito />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
