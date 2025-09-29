// src/data/mockDatabase.js

const initialBancaData = {
  capitalTotal: 0,
  valorEmprestado: 0,
  limiteMinimoAlerta: 10000.00,
  historico: [
    { id: 1, tipo: 'Aporte', valor: 50000.00, data: '2025-08-01', descricao: 'Capital inicial' },
    { id: 2, tipo: 'Retirada', valor: -5000.00, data: '2025-08-05', descricao: 'Retirada para despesas' },
  ]
};

const initialTransactions = [
  { id: 1, type: 'emprestimo', description: 'Contrato #12 - João Silva', amount: -500.00, date: '2025-08-15' },
  { id: 2, type: 'recebimento', description: 'Parcela 1/5 - Maria Costa', amount: 125.50, date: '2025-08-12' },
  { id: 3, type: 'emprestimo', description: 'Contrato #13 - Ana Souza', amount: -750.00, date: '2025-08-10' },
  { id: 4, type: 'recebimento', description: 'Parcela 3/3 - Carlos Lima', amount: 350.00, date: '2025-08-08' },
];

// Dados para a tela de Inadimplência
const initialInadimplenciaData = [
  { id: 1, nome: 'João da Silva Sauro', fotoUrl: 'https://i.pravatar.cc/150?img=1', valorDevido: 250.50, diasAtraso: 45, contratoId: 12 },
  { id: 2, nome: 'Pedro Martins Alencar', fotoUrl: 'https://i.pravatar.cc/150?img=2', valorDevido: 500.00, diasAtraso: 120, contratoId: 8 },
  { id: 3, nome: 'Beatriz Costa e Silva', fotoUrl: 'https://i.pravatar.cc/150?img=3', valorDevido: 180.75, diasAtraso: 22, contratoId: 15 },
];

const recalculateData = (data) => {
  if (data.banca && data.banca.historico) {
    data.banca.capitalTotal = data.banca.historico
      .filter(item => item.tipo === 'Aporte' || item.tipo === 'Retirada')
      .reduce((acc, item) => acc + item.valor, 0);
  }

  const totalLoaned = data.transactions
    .filter(tx => tx.type === 'emprestimo')
    .reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  
  const totalRepaid = data.transactions
    .filter(tx => tx.type === 'recebimento')
    .reduce((acc, tx) => acc + tx.amount, 0);

  if (data.banca) {
    data.banca.valorEmprestado = totalLoaned - totalRepaid;
  }
  
  if (data.kpis) {
    data.kpis.totalEmprestado = totalLoaned;
    const lucroEstimado = (totalLoaned - totalRepaid) * 0.25; 
    data.kpis.lucroPrevisto = lucroEstimado;
    data.kpis.totalAReceber = (totalLoaned - totalRepaid) + lucroEstimado;
  }
  
  return data;
};

const getInitialData = () => {
  const data = {
    kpis: {
      totalEmprestado: 0, totalAReceber: 0, lucroPrevisto: 0, taxaInadimplencia: 8.5,
    },
    transactions: initialTransactions,
    clientGrowth: [
      { month: 'Mar', newClients: 6 }, { month: 'Abr', newClients: 10 }, { month: 'Mai', newClients: 7 },
      { month: 'Jun', newClients: 12 }, { month: 'Jul', newClients: 15 }, { month: 'Ago', newClients: 13 },
    ],
    banca: initialBancaData,
    inadimplencia: initialInadimplenciaData,
  };
  return recalculateData(data);
};

export const saveData = (data) => {
  try {
    const dataToSave = recalculateData(data);
    const serializedData = JSON.stringify(dataToSave);
    localStorage.setItem('billityDashboardData', serializedData);
  } catch (err) {
    console.error("Erro ao salvar dados:", err);
  }
};

export const loadData = () => {
  try {
    const serializedData = localStorage.getItem('billityDashboardData');
    if (serializedData === null) {
      const initialData = getInitialData();
      saveData(initialData);
      return initialData;
    }
    
    const loadedData = JSON.parse(serializedData);
    const defaultData = getInitialData();
    // Garante que todas as chaves (kpis, banca, inadimplencia, etc.) existam
    const completeData = { 
      ...defaultData, 
      ...loadedData,
      banca: { ...defaultData.banca, ...(loadedData.banca || {}) }, 
      inadimplencia: loadedData.inadimplencia || defaultData.inadimplencia,
    };

    return recalculateData(completeData);

  } catch (err) {
    console.error("Erro ao carregar dados, restaurando para o padrão:", err);
    const initialData = getInitialData();
    saveData(initialData);
    return initialData;
  }
};

