import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddClient from './components/client/add-client.component';
import UpdateClient from './components/client/update-client.component';
import ReadClient from './components/client/read-client.component';
import ClientDetail from './components/client/client-detail.component';
import AddAddress from './components/address/add-address.component';
import UpdateAddress from './components/address/update-address.component';
import AddPerfil from './components/perfil/add-perfil.component';
import UpdatePerfil from './components/perfil/update-perfil.component';

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route exact path='/' element={<ReadClient/>} />
          <Route path='/agregar-cliente' element={<AddClient/>} />
          <Route path='/editar-cliente/:id' element={<UpdateClient/>} />
          <Route path='/detalle-cliente/:id' element={<ClientDetail/>} />

          <Route path='/detalle-cliente/:clientId/agregar-ubicacion' element={<AddAddress/>} />
          <Route path='/detalle-cliente/:clientId/editar-ubicacion/:id' element={<UpdateAddress/>} />
        
          <Route path='/detalle-cliente/:clientId/agregar-perfil' element={<AddPerfil/>} />
          <Route path='/detalle-cliente/:clientId/editar-perfil/:id' element={<UpdatePerfil/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
