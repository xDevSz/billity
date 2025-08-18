// src/pages/Login/index.jsx

import { useState } from 'react';
// IMPORTAMOS O useNavigate PARA FAZER O REDIRECIONAMENTO
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // INICIALIZAMOS O HOOK DE NAVEGAÇÃO
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Limpa erros anteriores

    // --- AQUI COMEÇA A SIMULAÇÃO ---
    // Usamos setTimeout para simular o tempo de espera de uma API real (1 segundo)
    setTimeout(() => {
      // Verificamos se os dados batem com os que definimos para o protótipo
      if (email === 'admin@billity.com' && password === '123456') {
        console.log('Login simulado com sucesso!');
        // Se o login estiver correto, redirecionamos para o dashboard
        navigate('/dashboard');
      } else {
        // Se estiver errado, mostramos uma mensagem de erro
        setError('Email ou senha inválidos para o protótipo.');
      }
      
      // Independentemente do resultado, paramos o loading
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.loginContainer}>
      <Card>
        <div className={styles.loginHeader}>
          <h2>Billity</h2>
          <p>Acesse sua conta para gerenciar seu negócio.</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <Input
            label="Seu Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Use: admin@billity.com"
            required
          />
          <Input
            label="Sua Senha"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Use: 123456"
            required
          />

          {/* Exibe a mensagem de erro, se houver */}
          {error && <p className={styles.errorMessage}>{error}</p>}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className={styles.footerLinks}>
          <Link to="/recuperar-senha">Esqueceu a senha?</Link>
          <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </Card>
    </div>
  );
}

export default Login;