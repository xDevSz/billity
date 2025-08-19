// src/pages/ClientDetail/index.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ClientDetail.module.css';
import { clientsData } from '../../services/mockClientData';
import { BiPaperclip } from 'react-icons/bi';
import Input from '../../components/ui/Input';

// (As funções auxiliares e o estado inicial permanecem os mesmos)
const initialContracts = (client) => client?.contracts.map(c => ({...c, fileName: `Contrato_${c.id}.pdf`, date: new Date().toLocaleDateString('pt-BR'), prazo: c.status === 'Ativo' ? 'No prazo' : 'Atrasado', estado: c.id === 'C001' ? 'Em andamento' : (c.id === 'C003' ? 'Renegociado' : 'Concluído')})) || [];
const getDotClass = (estado) => { if (estado === 'Concluído') return styles.dotConcluido; if (estado === 'Em andamento') return styles.dotEmAndamento; if (estado === 'Renegociado') return styles.dotRenegociado; return ''; };

function ClientDetail() {
  const { clientId } = useParams();
  const client = clientsData.find(c => c.id === parseInt(clientId));

  const [contracts, setContracts] = useState(initialContracts(client));
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValue, setFileValue] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files[0]) setSelectedFile(event.target.files[0]);
  };
  const handleFileUpload = () => { /* ... (lógica de anexo sem alteração) ... */
    if (selectedFile && fileValue) {
      const newContract = { id: `ANX-${Date.now().toString().slice(-4)}`, value: `R$ ${parseFloat(fileValue).toFixed(2)}`, prazo: 'No prazo', estado: 'Em andamento', fileName: selectedFile.name, date: new Date().toLocaleDateString('pt-BR') };
      setContracts(prevContracts => [newContract, ...prevContracts]);
      setSelectedFile(null); setFileValue('');
      document.getElementById('file-upload').value = "";
    } else {
      alert("Por favor, selecione um arquivo e defina um valor.");
    }
  };

  if (!client) { return <div><h2>Cliente não encontrado</h2><Link to="/clientes">Voltar para a lista</Link></div>; }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}><h1>{client.name}</h1><Link to="/clientes" className={styles.backButton}>Voltar para a Lista</Link></div>
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
          <h3>Anexar Novo Contrato</h3>
          <div className={styles.uploadSection}>
            {/* AQUI ESTÁ A MUDANÇA ESTRUTURAL */}
            <div className={styles.uploadControls}>
              <div className={styles.uploadInputs}>
                {/* 1. Input de arquivo escondido */}
                <input type="file" id="file-upload" className={styles.fileInput} onChange={handleFileChange} style={{display: 'none'}} />
                {/* 2. Label customizada que parece um botão/input */}
                <label htmlFor="file-upload" className={styles.fileInputLabel}>
                  {selectedFile ? selectedFile.name : 'Escolher arquivo...'}
                </label>
                {/* 3. Input de valor normal, mas agora menor */}
                <Input theme="light" id="fileValue" type="number" placeholder="Valor (R$)" value={fileValue} onChange={(e) => setFileValue(e.target.value)} />
              </div>
              <button onClick={handleFileUpload}>Anexar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.historySection}>
        {/* ... (toda a sua tabela de histórico de contratos, sem alterações) ... */}
        <div className={styles.header}>
            <h3>Histórico de Contratos</h3>
            <div className={styles.statusLegend}>
                <div className={styles.legendItem}><span className={`${styles.statusDot} ${styles.dotConcluido}`}></span> Concluído</div>
                <div className={styles.legendItem}><span className={`${styles.statusDot} ${styles.dotEmAndamento}`}></span> Em andamento</div>
                <div className={styles.legendItem}><span className={`${styles.statusDot} ${styles.dotRenegociado}`}></span> Renegociado</div>
            </div>
        </div>
        <div className={styles.tableContainer}>
            <table className={styles.contractsTable}>
                {/* ... thead e tbody ... */}
                <tbody>
                  {contracts.length > 0 ? contracts.map((contract) => (
                    <tr key={contract.id}>
                      <td><BiPaperclip style={{ marginRight: '8px', verticalAlign: 'middle' }} />{contract.fileName}</td>
                      <td>{contract.date}</td>
                      <td>{contract.value}</td>
                      <td>
                        <div className={styles.statusCell}>
                          <span className={`${styles.statusDot} ${getDotClass(contract.estado)}`}></span>
                          <span className={`${styles.statusText} ${contract.prazo === 'No prazo' ? styles.statusNoPrazo : styles.statusAtrasado}`}>
                            {contract.prazo}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>Nenhum contrato encontrado.</td></tr>
                  )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;