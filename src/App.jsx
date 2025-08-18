// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Páginas de Autenticação
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Páginas do App
import Dashboard from './pages/Dashboard';
// Crie rascunhos para as páginas abaixo para os links funcionarem
// import Clientes from './pages/Clientes'; 
// import Contratos from './pages/Contratos';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas de Autenticação (não têm a sidebar) */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />

        {/* Rotas Protegidas (todas usam o MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Adicione as outras rotas aqui */}
          {/* <Route path="/clientes" element={<Clientes />} /> */}
          {/* <Route path="/contratos" element={<Contratos />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;