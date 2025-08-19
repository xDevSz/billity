// src/pages/Clients/index.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Clients.module.css';
import { clientsData } from '../../services/mockClientData'; // Importa os dados

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

function Clients() {
  const [clients, setClients] = useState(clientsData);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  
  const handleAddClient = (event) => {
    event.preventDefault();
    const newClient = {
      id: Date.now(),
      name,
      whatsapp,
      email: 'novo.cliente@email.com',
      cpf: '111.222.333-44',
      contracts: []
    };
    setClients([newClient, ...clients]);
    setName('');
    setWhatsapp('');
  };

  return (
    <div className={styles.clientsContainer}>
      <div className={styles.formSection}>
        <h2>Cadastrar Novo Cliente</h2>
        <form onSubmit={handleAddClient} className={styles.form}>
          <div className={styles.formRow}><Input label="Nome Completo" id="clientName" type="text" value={name} onChange={e => setName(e.target.value)} required /><Input label="Whatsapp" id="clientWhatsapp" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required /></div>
          <div className={styles.formRow}><Input label="CPF" id="clientCpf" type="text" required /><Input label="Email" id="clientEmail" type="email" required /></div>
          <div className={styles.formRow}><Input label="CEP" id="clientCep" type="text" required /><Input label="Ocupação" id="clientOccupation" type="text" required /></div>
          <div className={styles.formRow}><Input label="Rua / Avenida" id="clientStreet" type="text" required /><Input label="Complemento" id="clientComplement" type="text" /></div>
          <Button type="submit" style={{ maxWidth: '300px', marginTop: '1rem' }}>Cadastrar Cliente</Button>
        </form>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.listSection}>
        <h2>Clientes Cadastrados</h2>
        <div className={styles.clientList}>
          {clients.map(client => (
            <Card key={client.id}>
              <div className={styles.clientCardContent}>
                <div className={styles.clientInfo}>
                  <strong>{client.name}</strong>
                  <span>{client.whatsapp}</span>
                  <span>{client.email}</span>
                </div>
                <div className={styles.clientActions}>
                  <Link to={`/clientes/${client.id}`} className="button-like">Ver Detalhes</Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Clients;