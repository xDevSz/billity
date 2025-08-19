// src/services/mockClientData.js

export const clientsData = [
  { 
    id: 1, 
    name: 'João da Silva Sauro', 
    whatsapp: '(11) 98765-4321', 
    email: 'joao.sauro@email.com',
    cpf: '123.456.789-00',
    birthDate: '1985-05-20',
    occupation: 'Advogado',
    address: {
        street: 'Rua dos Dinossauros, 123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zip: '01000-000'
    },
    contracts: [
        { id: 'C001', value: 'R$ 5.000,00', status: 'Ativo' },
        { id: 'C002', value: 'R$ 1.200,00', status: 'Finalizado' },
    ]
  },
  { 
    id: 2, 
    name: 'Maria Oliveira Costa', 
    whatsapp: '(21) 91234-5678', 
    email: 'maria.costa@email.com',
    cpf: '000.111.222-33',
    birthDate: '1992-11-30',
    occupation: 'Empresária',
    address: {
        street: 'Avenida Copacabana, 500',
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zip: '22020-001'
    },
    contracts: [
        { id: 'C003', value: 'R$ 15.000,00', status: 'Ativo' },
    ]
  },
];