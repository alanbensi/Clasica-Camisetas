import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element= {<Inicio />} />
        {/* <Route exact path='/productos' element= {<Productos />} /> */}
        {/* <Route exact path='/subastas' element= {<Subastas />} /> */}
        {/* <Route exact path='/vendeTuCamiseta' element= {<VendeTuCamiseta />} /> */}
        {/* <Route exact path='/nosotros' element= {<Nosotros />} /> */}
        {/* <Route exact path='/ayuda' element= {<Ayuda />} /> */}
        {/* <Route exact path='/carrito' element= {<Carrito />} /> */}
      </Routes>
    </div>
  );
}

export default App;
