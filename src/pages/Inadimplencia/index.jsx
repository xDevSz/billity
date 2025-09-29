// src/pages/Inadimplencia/index.jsx
import { useState, useEffect } from 'react';
import { loadData } from '../../data/mockDatabase';
import styles from './Inadimplencia.module.css';
import InadimplenteCard from '../../components/inadimplencia/InadimplenteCard';

function Inadimplencia() {
  const [inadimplentes, setInadimplentes] = useState([]);

  useEffect(() => {
    const data = loadData();
    // Ordena por dias em atraso, do maior para o menor
    const sortedData = data.inadimplencia.sort((a, b) => b.diasAtraso - a.diasAtraso);
    setInadimplentes(sortedData);
  }, []);

  if (!inadimplentes) {
    return <Loader message="Carregando lista de inadimplentes..." />;
  }

  return (
    <div className={styles.inadimplenciaContainer}>
      <div className={styles.header}>
        <h1>Gestão de Inadimplência</h1>
        <p>Acompanhe os clientes com pagamentos em atraso para ações de cobrança.</p>
      </div>

      {inadimplentes.length > 0 ? (
        <div className={styles.grid}>
          {inadimplentes.map(item => (
            <InadimplenteCard key={item.id} inadimplente={item} />
          ))}
        </div>
      ) : (
        <div className={styles.noData}>
          <p>🎉 Ótima notícia! Não há clientes inadimplentes no momento.</p>
        </div>
      )}
    </div>
  );
}

export default Inadimplencia;