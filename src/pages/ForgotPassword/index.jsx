// src/pages/ForgotPassword/index.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

import styles from '../../styles/AuthLayout.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar a exibição

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulação de API
    setTimeout(() => {
      console.log('Solicitação de recuperação para:', email);
      setLoading(false);
      setIsSubmitted(true); // Muda para o estado de "enviado"
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      {/* 👇 A MUDANÇA É SÓ AQUI 👇 */}
      <div className={styles.formWrapper}>
        <Card>
          {/* Usamos renderização condicional aqui */}
          {!isSubmitted ? (
            // Estado 1: Formulário para inserir o email
            <>
              <div className={styles.loginHeader}>
                <h2>Recuperar Senha</h2>
                <p>Digite seu email para receber o link de recuperação.</p>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.loginForm}>
                <Input label="Email Cadastrado" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Button type="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Link'}
                </Button>
              </form>
            </>
          ) : (
            // Estado 2: Mensagem de confirmação
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#FFD700', marginBottom: '1rem' }}>Verifique seu Email</h2>
              <p>Se uma conta com o email informado existir, um link para a redefinição de senha foi enviado.</p>
              <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
                <Link to="/" style={{ color: '#FFD700', textDecoration: 'none' }}>Voltar para o Login</Link>
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ForgotPassword;