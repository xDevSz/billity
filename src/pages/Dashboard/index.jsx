// src/pages/Dashboard/index.jsx

import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './Dashboard.module.css';

// Componentes do Dashboard que criamos
import KpiCard from '../../components/dashboard/KpiCard';
import TransactionTimeline from '../../components/dashboard/TransactionTimeline';

// Ícones que vamos usar
import { BiErrorCircle, BiDollarCircle, BiBarChartAlt, BiLineChart, BiTrendingUp } from 'react-icons/bi';

// --- Dados Simulados (Mock) para o Protótipo ---
// No futuro, estes dados virão da sua API
const mockData = {
  kpis: [
    { id: 1, title: 'Total Emprestado', value: 'R$ 1.250,00', icon: <BiTrendingUp />, color: '#e6f7ff' },
    { id: 2, title: 'Total a Receber', value: 'R$ 1.575,00', icon: <BiDollarCircle />, color: '#fff0f6' },
    { id: 3, title: 'Lucro Previsto', value: 'R$ 325,00', icon: <BiLineChart />, color: '#f6ffed' },
    { id: 4, title: 'Juros Médio', value: '26%', icon: <BiBarChartAlt />, color: '#fffbe6' },
  ],
  transactions: [
    { id: 1, type: 'emprestimo', description: 'Contrato #12 - João Silva', amount: '- R$ 500,00', date: '15 de Ago, 2025' },
    { id: 2, type: 'recebimento', description: 'Parcela 1/5 - Maria Costa', amount: '+ R$ 125,50', date: '12 de Ago, 2025' },
    { id: 3, type: 'emprestimo', description: 'Contrato #13 - Ana Souza', amount: '- R$ 750,00', date: '10 de Ago, 2025' },
    { id: 4, type: 'recebimento', description: 'Parcela 3/3 - Carlos Lima', amount: '+ R$ 350,00', date: '08 de Ago, 2025' },
  ]
};

// --- Sub-componente do Banner ---
const CompleteProfileBanner = ({ onOpenModal }) => (
  <div className={styles.banner}>
    <BiErrorCircle />
    <div className={styles.bannerText}>
      <strong>Seu cadastro está incompleto.</strong>
      <span>Para liberar todas as funcionalidades da plataforma, por favor, complete seu perfil.</span>
    </div>
    <button onClick={onOpenModal} className={styles.bannerButton}>
      Completar Cadastro
    </button>
  </div>
);
CompleteProfileBanner.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

// --- Componente Principal do Dashboard ---
function Dashboard() {
  const { user, openProfileModal } = useAuth();

  // Se o perfil estiver incompleto, não mostramos os dados do dashboard
  if (!user.profileComplete) {
    return (
      <div className={styles.dashboard}>
        <CompleteProfileBanner onOpenModal={openProfileModal} />
        <div className={styles.lockedContent}>
          <h2>Complete seu cadastro para visualizar o dashboard.</h2>
        </div>
      </div>
    );
  }

  // Se o perfil estiver completo, mostramos o dashboard real
  return (
    <div className={styles.dashboard}>
      <div className={styles.kpiGrid}>
        {mockData.kpis.map(kpi => (
          <KpiCard 
            key={kpi.id} 
            title={kpi.title} 
            value={kpi.value} 
            icon={kpi.icon}
            iconBgColor={kpi.color}
          />
        ))}
      </div>

      <div className={styles.contentGrid}>
        <TransactionTimeline transactions={mockData.transactions} />
        <div className={styles.chartPlaceholder}>
          <h3>Clientes</h3>
          <p>(Gráfico de evolução de clientes)</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;