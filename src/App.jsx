import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Páginas de Autenticação
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Páginas do App
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes'; 
import Contracts from './pages/Contracts'; 
import ClientDetail from './pages/ClientDetails'; 
import Vencimentos from './pages/Vencimentos';
import Settings from './pages/Settings';
import Banca from './pages/Banca';
import Inadimplencia from './pages/Inadimplencia'; 
import UserProfile from './pages/UserProfile';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas de Autenticação */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />

        {/* Rotas Protegidas (dentro do layout com sidebar) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} /> 
          <Route path="/clientes/:clientId" element={<ClientDetail />} />
          <Route path="/contracts" element={<Contracts />} /> 
          <Route path="/vencimentos" element={<Vencimentos />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/banca" element={<Banca />} />
          <Route path="/perfil" element={<UserProfile />} />
          {/* Rota final para a página de Inadimplência */}
          <Route path="/inadimplencia" element={<Inadimplencia />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

