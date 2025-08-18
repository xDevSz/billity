// src/pages/Clients/index.jsx

import { useState, useEffect } from 'react';

// 1. Importa o serviço que busca os dados
import { getClients } from '../../services/clientsService';

// 2. Importa os componentes de UI reutilizáveis
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

// 3. Importa o CSS específico desta página
import styles from './Clients.module.css';

function Clients() {
  // 4. Estados para controlar os dados, o carregamento e possíveis erros
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 5. useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError('Falha ao carregar clientes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchClients();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // 6. Renderização condicional com base nos estados
  if (loading) {
    return <p>Carregando clientes...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className={styles.clientsContainer}>
      <header className={styles.header}>
        <h1>Meus Clientes</h1>
        <Button>Adicionar Cliente</Button>
      </header>

      <div className={styles.clientsList}>
        {clients.map((client) => (
          // Usando um componente Card para cada cliente
          <Card key={client.id}>
            <h3>{client.name}</h3>
            <p>Email: {client.email}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Clients;