import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CompleteProfileModal.module.css';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext'; // <--- Importação necessária
import { IoClose } from 'react-icons/io5';
import { BiMailSend } from 'react-icons/bi';

// --- Sub-componente Formulário de Cadastro ---
const RegisterForm = ({ onBack }) => {
  const [userType, setUserType] = useState('fisica');
  const { completeProfile } = useAuth();
  const { theme } = useTheme(); // <--- Pega o tema

  const handleSubmit = (event) => {
    event.preventDefault();
    completeProfile();
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Conclua seu Cadastro</h2>
        <p>Preencha os dados abaixo para começar a usar a plataforma.</p>
      </div>
      <div className={styles.userTypeSelector}>
        <button className={userType === 'fisica' ? styles.active : ''} onClick={() => setUserType('fisica')} type="button">Pessoa Física</button>
        <button className={userType === 'juridica' ? styles.active : ''} onClick={() => setUserType('juridica')} type="button">Pessoa Jurídica</button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {userType === 'fisica' ? (
          <>
            <Input label="Nome Completo" id="fullName" type="text" theme={theme} required />
            <Input label="CPF" id="cpf" type="text" theme={theme} required />
            <Input label="Data de Nascimento" id="birthDate" type="date" theme={theme} required />
          </>
        ) : (
          <>
            <Input label="Razão Social" id="razaoSocial" type="text" theme={theme} required />
            <Input label="CNPJ" id="cnpj" type="text" theme={theme} required />
          </>
        )}
        <Input label="Telefone de Contato" id="phone" type="tel" theme={theme} required />
        <fieldset className={styles.addressGrid}>
          <div className={styles.fullWidth}><Input label="Rua / Avenida" id="street" type="text" theme={theme} required /></div>
          <Input label="Número" id="number" type="text" theme={theme} required />
          <Input label="Bairro" id="neighborhood" type="text" theme={theme} required />
          <div className={styles.fullWidth}><Input label="Cidade" id="city" type="text" theme={theme} required /></div>
          <Input label="Estado" id="state" type="text" theme={theme} required />
          <Input label="CEP" id="zip" type="text" theme={theme} required />
        </fieldset>
        <Button type="submit" style={{ marginTop: '1rem' }}>Salvar e Finalizar</Button>
        <a onClick={onBack} className={styles.backLink}>Voltar para seleção</a>
      </form>
    </>
  );
};
RegisterForm.propTypes = { onBack: PropTypes.func.isRequired };

// --- Sub-componente Formulário de Vínculo ---
const LinkToCompanyForm = ({ onBack }) => {
  const [linkRequestSent, setLinkRequestSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { completeProfile } = useAuth(); 
  const { theme } = useTheme(); // <--- Pega o tema

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLinkRequestSent(true);
    }, 1500);
  };

  if (linkRequestSent) {
    return (
      <div className={styles.confirmationScreen}>
        <BiMailSend />
        <div className={styles.header}>
          <h2>Solicitação Enviada!</h2>
          <p>Um requerimento de vínculo foi enviado para a empresa. Você será notificado por email assim que sua solicitação for aprovada.</p>
        </div>
        <Button onClick={completeProfile} style={{maxWidth: '200px', margin: '0 auto'}}>Ok, entendi</Button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h2>Vincular-se a uma Empresa</h2>
        <p>Insira seus dados e o CNPJ da empresa para solicitar o vínculo.</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.dualInputContainer}>
          <Input label="Seu CPF" id="userCpf" type="text" theme={theme} required />
          <Input label="CNPJ da Empresa" id="companyCnpj" type="text" theme={theme} required />
        </div>
        <Input label="Seu Email" id="userEmail" type="email" theme={theme} required />
        <Button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Enviando...' : 'Enviar Solicitação'}
        </Button>
        <a onClick={onBack} className={styles.backLink}>Voltar para seleção</a>
      </form>
    </>
  );
};
LinkToCompanyForm.propTypes = { onBack: PropTypes.func.isRequired };

// --- Componente Principal do Modal ---
function CompleteProfileModal() {
  const [mode, setMode] = useState('selection');
  const { closeProfileModal } = useAuth(); 

  const renderContent = () => {
    if (mode === 'register') return <RegisterForm onBack={() => setMode('selection')} />;
    if (mode === 'link') return <LinkToCompanyForm onBack={() => setMode('selection')} />;
    return (
      <>
        <div className={styles.header}>
          <h2>Bem-vindo(a) ao Billity!</h2>
          <p>Para continuar, crie uma nova conta ou vincule-se a uma empresa existente.</p>
        </div>
        <div className={styles.choiceContainer}>
          <div className={styles.choiceCard} onClick={() => setMode('register')}><h3>Criar uma Nova Conta</h3><p>Para gerenciar seus próprios clientes e contratos.</p></div>
          <div className={styles.choiceCard} onClick={() => setMode('link')}><h3>Vincular-se a uma Empresa</h3><p>Você foi convidado para uma equipe já cadastrada.</p></div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <Card>
          <button className={styles.closeButton} onClick={closeProfileModal}>
            <IoClose />
          </button>
          {renderContent()}
          <div className={styles.supportFooter}>
            Dúvidas? Entre em contato: <a href="mailto:suporte@billity.com">suporte@billity.com</a>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CompleteProfileModal;
