import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element= {<Inicio />} />
        {/* <Route exact path='/productos' element= {<Productos />} /> */}
        {/* <Route exact path='/subastas' element= {<Subastas />} /> */}
        {/* <Route exact path='/vendeTuCamiseta' element= {<VendeTuCamiseta />} /> */}
        {/* <Route exact path='/nosotros' element= {<Nosotros />} /> */}
        {/* <Route exact path='/ayuda' element= {<Ayuda />} /> */}
        {/* <Route exact path='/carrito' element= {<Carrito />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
