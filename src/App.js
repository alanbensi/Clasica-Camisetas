import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './components/inicio/Inicio';
import NavClasica from './components/navClasica/NavClasica'; 
import Footer from './components/footer/Footer';
import VendeTuCamiseta from './components/vende-tu-camiseta/VendeTuCamiseta';

function App() {
  return (
    <div>
      <NavClasica />
      <Routes>
        <Route exact path='/' element= {<Inicio />} />
        {/* <Route exact path='/productos' element= {<Productos />} /> */}
        {/* <Route exact path='/subastas' element= {<Subastas />} /> */}
        <Route exact path='/vendeTuCamiseta' element= {<VendeTuCamiseta />} />
        {/* <Route exact path='/nosotros' element= {<Nosotros />} /> */}
        {/* <Route exact path='/ayuda' element= {<Ayuda />} /> */}
        {/* <Route exact path='/carrito' element= {<Carrito />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
