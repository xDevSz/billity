import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext'; // Importação necessária
import styles from './UserProfile.module.css';

// Componentes UI (Assumindo que Input, Card, Button existem em ../../components/ui)
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// Ícones
import { BiUser, BiSave, BiKey } from 'react-icons/bi';

// --- Subcomponente: Edição de Dados Pessoais ---
const UserProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme(); // Pega o tema atual
  
  // Inicializa o estado do formulário com os dados atuais do usuário
  const [formData, setFormData] = useState({
    nome: user.nome || '',
    email: user.email || '',
    telefone: user.telefone || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Garante que o estado interno do formulário reflita o usuário mais recente
  useEffect(() => {
    setFormData({
      nome: user.nome || '',
      email: user.email || '',
      telefone: user.telefone || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setSuccess(false); // Remove a mensagem de sucesso ao editar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação da chamada de API para atualizar o perfil
    setTimeout(() => {
      // Chama a função do AuthContext para atualizar o estado global do usuário
      updateUserProfile(formData); 
      setLoading(false);
      setSuccess(true);
      // Esconde a mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <Card className={styles.settingsSection}>
      <header className={styles.sectionHeader}>
        <BiUser className={styles.headerIcon} />
        <h3>Dados Pessoais</h3>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
          label="Nome Completo" 
          id="nome" 
          type="text" 
          theme={theme} // Propaga o tema
          value={formData.nome} 
          onChange={handleChange}
          required 
        />
        {/* Email é apenas para visualização, pois é a chave de login */}
        <Input 
          label="Email (Não Editável)" 
          id="email" 
          type="email" 
          theme={theme} // Propaga o tema
          value={formData.email} 
          disabled 
        />
        <Input 
          label="Telefone de Contato" 
          id="telefone" 
          type="tel" 
          theme={theme} // Propaga o tema
          value={formData.telefone} 
          onChange={handleChange}
        />

        {success && <p className={styles.successMessage}>Perfil atualizado com sucesso!</p>}

        <Button type="submit" disabled={loading} style={{ alignSelf: 'flex-start' }}>
          <BiSave />
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Card>
  );
};

// --- Subcomponente: Alteração de Senha (Mock) ---
const SecuritySettings = () => {
    const { theme } = useTheme(); // Pega o tema atual

    return (
      <Card className={styles.settingsSection}>
        <header className={styles.sectionHeader}>
          <BiKey className={styles.headerIcon} />
          <h3>Segurança</h3>
        </header>
        <form className={styles.form}>
            <Input label="Senha Atual" id="currentPassword" type="password" theme={theme} required />
            <Input label="Nova Senha" id="newPassword" type="password" theme={theme} required />
            <Input label="Confirmar Nova Senha" id="confirmPassword" type="password" theme={theme} required />
            <Button type="button" style={{ alignSelf: 'flex-start', backgroundColor: '#dc3545' }}>
              Alterar Senha
            </Button>
        </form>
      </Card>
    );
};


// --- Componente Principal da Página ---
function UserProfile() {
  return (
    <div className={styles.settingsPage}>
      <header className={styles.pageHeader}>
        <h1>Configurações do Perfil</h1>
        <p>Edite suas informações pessoais e gerencie a segurança de sua conta.</p>
      </header>

      <UserProfileSettings />
      <SecuritySettings />
    </div>
  );
}

export default UserProfile;