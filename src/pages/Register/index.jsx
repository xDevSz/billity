// src/pages/Register/index.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

// Usando nosso layout compartilhado!
import styles from '../../styles/AuthLayout.module.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    
    // Validação simples para o protótipo
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);

    // Simulação de API
    setTimeout(() => {
      console.log('Usuário cadastrado (simulado):', { name, email, password });
      setLoading(false);
      // Após o cadastro, podemos levar o usuário para a tela de login
      navigate('/'); 
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      {/* 👇 A MUDANÇA É SÓ AQUI 👇 */}
      <div className={styles.formWrapper}>
        <Card>
          <div className={styles.loginHeader}>
            <h2>Crie sua Conta</h2>
            <p>Preencha os dados para começar.</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <Input label="Nome Completo" id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
            <Input label="Email Profissional" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="Senha" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Input label="Confirme sua Senha" id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

            {error && <p className={styles.errorMessage}>{error}</p>}
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>

          <div className={styles.footerLinks}>
            <p>Já tem uma conta? <Link to="/">Faça Login</Link></p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Register;