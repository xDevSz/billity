// src/pages/ClientDetail/index.jsx
import { useParams, Link } from 'react-router-dom';
import styles from './ClientDetail.module.css';
import { clientsData } from '../../services/mockClientData'; // Importa os dados

function ClientDetail() {
  const { clientId } = useParams();
  const client = clientsData.find(c => c.id === parseInt(clientId));

  if (!client) {
    return <div style={{color: '#333'}}><h2>Cliente não encontrado</h2><Link to="/clientes">Voltar para a lista</Link></div>;
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}><h1>{client.name}</h1><Link to="/clientes" className="button-like">Voltar</Link></div>
      <div className={styles.contentGrid}>
        <div className={styles.dataSection}>
          <h3>Dados Pessoais</h3>
          <ul>
            <li><strong>CPF:</strong> {client.cpf || 'Não informado'}</li>
            <li><strong>Email:</strong> {client.email || 'Não informado'}</li>
            <li><strong>Whatsapp:</strong> {client.whatsapp || 'Não informado'}</li>
            <li><strong>Ocupação:</strong> {client.occupation || 'Não informado'}</li>
            <li><strong>Endereço:</strong> {client.address?.street || 'Não informado'}</li>
          </ul>
        </div>
        <div className={styles.contractsSection}>
          <h3>Contratos Vinculados ({client.contracts.length})</h3>
          <div className={styles.contractList}>
            {client.contracts.length > 0 ? client.contracts.map(contract => (
              <div key={contract.id} className={styles.contractCard}>
                <strong>Contrato #{contract.id}</strong>
                <span>Valor: {contract.value}</span>
                <span className={`${styles.status} ${styles[contract.status.toLowerCase()]}`}>{contract.status}</span>
              </div>
            )) : <p>Nenhum contrato encontrado para este cliente.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientDetail;