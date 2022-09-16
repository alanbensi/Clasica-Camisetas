import React from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './components/pages/inicio/Inicio';
import NavClasica from './components/moleculs/navClasica/NavClasica'; 
import Footer from './components/moleculs/footer/Footer';
import VendeTuCamiseta from './components/pages/vende-tu-camiseta/VendeTuCamiseta.jsx';
import Login from './components/pages/login/Login';
import Registrate from './components/pages/registrate/Registrate';
import MailRestablecerContrasena from './components/pages/mailRestablecerContrasena/MailRestablecerContrasena';
import LoginNuevaContrasena from './components/pages/loginNuevaContrasena/LoginNuevaContrasena';
import NuevaContrasena from './components/pages/nuevaContrasena/NuevaContrasena';
import RestablecerContrasena from './components/pages/restablecerContrasena/RestablecerContrasena';
import Ayuda from './components/pages/ayuda/Ayuda';
import DetalleCamisetas from './components/pages/detalleCamisetas/DetalleCamisetas';
import Carrito from './components/pages/carrito/Carrito';
import MiCuenta from './components/pages/miCuenta/MiCuenta';
import DetalleDeCompra from './components/pages/detalleDeCompra/DetalleDeCompra';

function App() {
  return (
    <>
      <NavClasica />
      <Routes>
        <Route exact path='/Login' element = {<Login />} />
        <Route exact path='/Registrate' element={<Registrate />} />
        <Route exact path='/' element= {<Inicio />} />
        <Route exact path='/Restablecer-Contrasena' element={<RestablecerContrasena />} />
        <Route exact path='/Mail-Restablecer-Contrasena' element={<MailRestablecerContrasena />} />
        <Route exact path='/Nueva-Contrasena' element={<NuevaContrasena />} />
        <Route exact path='/Login-Nueva-Contrasena' element={<LoginNuevaContrasena />} />
        <Route exact path='/Ayuda' element={<Ayuda />} />
        <Route exact path='/Detalle-Camisetas' element={<DetalleCamisetas />} />
        {/* <Route exact path='/subastas' element= {<Subastas />} /> */}
        <Route exact path='/Vende-tu-camiseta' element= {<VendeTuCamiseta />} />
        <Route exact path='/Mi-cuenta' element={<MiCuenta />} />
        {/* <Route exact path='/nosotros' element= {<Nosotros />} /> */}
        {/* <Route exact path='/ayuda' element= {<Ayuda />} /> */}
        <Route exact path='/Carrito-de-compras' element= {<Carrito />} />
        <Route exact path='/Detalle-de-compra' element={<DetalleDeCompra />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
