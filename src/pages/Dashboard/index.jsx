// src/pages/Dashboard/index.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './Dashboard.module.css';

// Componentes
import KpiCard from '../../components/dashboard/KpiCard';
import TransactionTimeline from '../../components/dashboard/TransactionTimeline';
import ClientChart from '../../components/dashboard/ClientChart';
import CompleteProfileBanner from '../../components/dashboard/CompleteProfileBanner';

// Funções do "Banco de Dados"
import { loadData } from '../../data/mockDatabase.js';

// Ícones
import { BiErrorCircle, BiDollarCircle, BiTrendingUp, BiLineChart, BiUserMinus } from 'react-icons/bi';

function Dashboard() {
  const { user, openProfileModal } = useAuth();
  const [data, setData] = useState(null);

  // Carrega os dados do localStorage na primeira renderização
  useEffect(() => {
    setData(loadData());
  }, []);

  // Se o perfil está incompleto, mostra o banner
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

  // Se os dados ainda não foram carregados, mostra um loading
  if (!data) {
    return <div>Carregando dados do dashboard...</div>;
  }
  
  // Dashboard completo
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>Visão geral do seu negócio em tempo real.</p>
      </header>

      {/* Grid de KPIs */}
      <div className={styles.kpiGrid}>
        <KpiCard title="Total Emprestado" value={data.kpis.totalEmprestado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={<BiTrendingUp />} />
        <KpiCard title="Total a Receber" value={data.kpis.totalAReceber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={<BiDollarCircle />} />
        <KpiCard title="Lucro Previsto" value={data.kpis.lucroPrevisto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={<BiLineChart />} />
        <KpiCard title="Taxa de Inadimplência" value={`${data.kpis.taxaInadimplencia}%`} icon={<BiUserMinus />} />
      </div>

      {/* Grid de Conteúdo Principal (Gráfico e Transações) */}
      <div className={styles.contentGrid}>
        <div className={styles.mainContent}>
          <ClientChart data={data.clientGrowth} />
        </div>
        <aside className={styles.sidebarContent}>
          <TransactionTimeline transactions={data.transactions} />
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;