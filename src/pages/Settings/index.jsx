// src/pages/Settings/index.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Settings.module.css';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// --- Sub-componente ToggleSwitch ---
const ToggleSwitch = ({ label, description }) => (
  <div className={styles.toggleRow}>
    <div className={styles.settingRow}>
      <label htmlFor={label}>{label}</label>
      {description && <small>{description}</small>}
    </div>
    <label className={styles.switch}>
      <input type="checkbox" id={label} />
      <span className={styles.slider}></span>
    </label>
  </div>
);
ToggleSwitch.propTypes = { label: PropTypes.string.isRequired, description: PropTypes.string };

// --- Componente Principal ---
function Settings() {
  const [activeTab, setActiveTab] = useState('geral');
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.tabs}>
        <button onClick={() => setActiveTab('geral')} className={activeTab === 'geral' ? styles.active : ''}>Geral</button>
        <button onClick={() => setActiveTab('notificacoes')} className={activeTab === 'notificacoes' ? styles.active : ''}>Notificações</button>
        <button onClick={() => setActiveTab('aparencia')} className={activeTab === 'aparencia' ? styles.active : ''}>Aparência</button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'geral' && (
          <div>
            <h2>Configurações Gerais</h2>
            <form className={styles.form}>
              <div className={styles.settingRow}>
                <label htmlFor="defaultInterest">Taxa de Juros Padrão (%)</label>
                <small>Defina a taxa de juros que será sugerida ao criar um novo contrato.</small>
                <Input theme="light" id="defaultInterest" type="number" placeholder="Ex: 5.5" />
              </div>
              <div className={styles.settingRow}>
                <label htmlFor="defaultPeriod">Período Padrão (meses)</label>
                <small>Defina o período padrão que será sugerido para novos contratos.</small>
                <Input theme="light" id="defaultPeriod" type="number" placeholder="Ex: 12" />
              </div>
              <div className={styles.settingRow}>
                <p>Exportação de Dados</p>
                <small>Baixe um arquivo .CSV com todos os seus dados de clientes e contratos.</small>
                <div className={styles.formActions}>
                  <Button type="button" style={{backgroundColor: '#6c757d'}}>Exportar Dados</Button>
                </div>
              </div>
              <div className={styles.formActions}>
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'notificacoes' && (
          <div>
            <h2>Preferências de Notificação</h2>
            <div className={styles.form}>
              <ToggleSwitch label="Alertas por Email" description="Receber um email 3 dias antes do vencimento de uma parcela." />
              <ToggleSwitch label="Notificações no App" description="Mostrar um aviso no dashboard para pagamentos atrasados." />
              <ToggleSwitch label="Resumo Semanal" description="Enviar um relatório financeiro resumido para seu email toda segunda-feira." />
            </div>
          </div>
        )}

        {activeTab === 'aparencia' && (
          <div>
            <h2>Aparência do Sistema</h2>
            <div className={styles.themeSelector}>
              <p>Escolha como você quer visualizar a plataforma.</p>
              <div className={styles.toggleWrapper}>
                <span>Claro</span>
                <label className={styles.switch}>
                  <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                  <span className={styles.slider}></span>
                </label>
                <span>Escuro</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;