// src/pages/Banca/index.jsx

import { useState, useEffect } from 'react';
import { loadData, saveData } from '../../data/mockDatabase';
import styles from './Banca.module.css';
import { BiWallet, BiTrendingDown, BiMoney, BiInfoCircle, BiPlusCircle, BiMinusCircle } from 'react-icons/bi';

// Componente para os cards de indicadores (KPIs)
const KpiCard = ({ title, value, icon, isAlert }) => (
  <div className={`${styles.kpiCard} ${isAlert ? styles.alert : ''}`}>
    <div className={styles.iconWrapper}>{icon}</div>
    <div className={styles.textWrapper}>
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  </div>
);

function Banca() {
  const [bancaData, setBancaData] = useState(null);
  
  useEffect(() => {
    const data = loadData();
    setBancaData(data.banca);
  }, []);

  const handleUpdateCapital = (valor, tipo) => {
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    const newBancaData = { ...bancaData };
    const novoHistorico = {
      id: newBancaData.historico.length + 1,
      tipo: tipo,
      valor: tipo === 'Aporte' ? valorNumerico : -valorNumerico,
      data: new Date().toISOString().slice(0, 10),
      descricao: `${tipo} manual`
    };

    newBancaData.capitalTotal = tipo === 'Aporte' ? newBancaData.capitalTotal + valorNumerico : newBancaData.capitalTotal - valorNumerico;
    newBancaData.historico.push(novoHistorico);

    setBancaData(newBancaData);
    
    // Salva os dados completos no localStorage
    const fullData = loadData();
    fullData.banca = newBancaData;
    saveData(fullData);
  };

  const handleUpdateLimite = (limite) => {
    const valorNumerico = parseFloat(limite);
     if (isNaN(valorNumerico) || valorNumerico < 0) return;

    const newBancaData = { ...bancaData, limiteMinimoAlerta: valorNumerico };
    setBancaData(newBancaData);

    const fullData = loadData();
    fullData.banca = newBancaData;
    saveData(fullData);
  };

  if (!bancaData) {
    return <div>Carregando...</div>;
  }

  const saldoDisponivel = bancaData.capitalTotal - bancaData.valorEmprestado;
  const emAlerta = saldoDisponivel < bancaData.limiteMinimoAlerta;

  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.bancaContainer}>
      <div className={styles.header}>
        <h1>Gestão de Banca</h1>
        <p>Controle seu capital, fluxo de caixa e defina alertas de liquidez.</p>
      </div>

      <div className={styles.kpiGrid}>
        <KpiCard title="Capital Total" value={formatCurrency(bancaData.capitalTotal)} icon={<BiWallet />} />
        <KpiCard title="Valor Emprestado" value={formatCurrency(bancaData.valorEmprestado)} icon={<BiTrendingDown />} />
        <KpiCard title="Saldo Disponível" value={formatCurrency(saldoDisponivel)} icon={<BiMoney />} isAlert={emAlerta} />
      </div>

      {emAlerta && (
        <div className={styles.alertMessage}>
          <BiInfoCircle />
          <span><b>Atenção:</b> Seu saldo disponível atingiu o limite mínimo de alerta de liquidez.</span>
        </div>
      )}

      <div className={styles.contentGrid}>
        <div className={styles.card}>
          <h2>Movimentar Capital</h2>
          <p>Adicione ou remova valores do seu capital total. Use valores negativos para retiradas.</p>
          <div className={styles.form}>
            <input 
              type="number" 
              placeholder="Ex: 5000.00" 
              className={styles.input}
              id="valorMovimento"
            />
            <button className={styles.buttonAporte} onClick={() => handleUpdateCapital(document.getElementById('valorMovimento').value, 'Aporte')}>
              <BiPlusCircle /> Aporte
            </button>
            <button className={styles.buttonRetirada} onClick={() => handleUpdateCapital(document.getElementById('valorMovimento').value, 'Retirada')}>
              <BiMinusCircle /> Retirada
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Alerta de Liquidez</h2>
          <p>Defina um valor mínimo para o saldo disponível. Você será notificado quando este limite for atingido.</p>
           <div className={styles.form}>
            <input 
              type="number" 
              placeholder="Ex: 10000.00" 
              className={styles.input}
              defaultValue={bancaData.limiteMinimoAlerta}
              onBlur={(e) => handleUpdateLimite(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banca;