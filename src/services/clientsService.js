// src/services/clientsService.js

// A URL base da sua API. Poderia vir de uma variável de ambiente.
const API_URL = 'https://api.seusite.com';

// Função para buscar todos os clientes
export const getClients = async () => {
  // Por enquanto, vamos retornar dados de mentira (mock) para testar
  // Quando tiver um backend, você vai descomentar o código com `fetch`
  console.log('Buscando clientes...');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Empresa A', email: 'contato@empresa-a.com' },
        { id: 2, name: 'Empresa B', email: 'financeiro@empresa-b.com' },
      ]);
    }, 1000); // Simula 1 segundo de espera da rede
  });

  /* CÓDIGO REAL QUANDO TIVER BACKEND:
  const response = await fetch(`${API_URL}/clients`);
  if (!response.ok) {
    throw new Error('Erro ao buscar clientes da API');
  }
  return response.json();
  */
};

// Função para adicionar um novo cliente
export const createClient = async (clientData) => {
  const response = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar cliente');
  }
  return response.json();
};