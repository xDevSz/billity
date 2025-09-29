// src/pages/Login/index.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/AuthLayout.module.css';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import logo from '../../assets/logo10.png'; // Lembre-se de por sua logo aqui

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@billity.com' && password === '123456') {
        navigate('/dashboard');
      } else {
        setError('Email ou senha inválidos para o protótipo.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <Card>
          <div className={styles.loginHeader}>
            <img src={logo} alt="Logo da Billity" className={styles.logo} />
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
    </div>
  );
}

export default Login;