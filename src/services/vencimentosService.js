// src/services/vencimentosService.js

import { parse, isBefore, startOfDay } from 'date-fns'; 

// Mock de dados de prazos (vencimentos) dos contratos
const mockVencimentos = [
  { id: 1, title: 'Contrato 1234 (Parcela 1/12)', date: '2025-10-03', amount: 1500.00, client: 'Cliente A', type: 'receber' },
  // REFORÇANDO O TESTE: Este item DEVE ser vencido em 01/10/2025
  { id: 2, title: 'Contrato 5678 (Parcela 5/6)', date: '2025-09-28', amount: 550.00, client: 'Cliente B', type: 'receber' }, 
  { id: 3, title: 'Contrato Vencido X', date: '2025-09-15', amount: 800.00, client: 'Cliente Vencido', type: 'receber' },
  { id: 4, title: 'Contrato 9012 (Parcela 2/24)', date: '2025-10-15', amount: 2100.00, client: 'Cliente C', type: 'receber' },
  { id: 5, title: 'Pagamento Fundo de Banca', date: '2025-10-25', amount: 350.00, client: 'Banco Y', type: 'pagar' },
  { id: 6, title: 'Vencimento Novembro', date: '2025-11-10', amount: 1200.00, client: 'Cliente E', type: 'receber' },
  { id: 7, title: 'Vencimento Dezembro', date: '2025-12-05', amount: 4000.00, client: 'Cliente F', type: 'receber' },
];

/**
 * Simula a busca de todos os vencimentos de contratos e outras obrigações.
 * @returns {Promise<Array>} Lista de eventos de vencimento.
 */
export async function fetchVencimentos() {
    // CRUCIAL: Captura a data atual e a normaliza para 00:00:00.
    const todayStartOfDay = startOfDay(new Date());

    // Simula um atraso de rede
    return new Promise(resolve => {
        setTimeout(() => {
            const eventsWithCalculatedStatus = mockVencimentos.map(event => {
                // Analisa a string de data, gerando um objeto Date
                const parsedDate = parse(event.date, 'yyyy-MM-dd', new Date());
                
                // Normaliza a data do evento para 00:00:00 para comparação limpa.
                const eventStartOfDay = startOfDay(parsedDate);
                
                // CALCULA O STATUS: Se a data do evento for estritamente anterior à data de hoje, está vencido.
                const isOverdue = isBefore(eventStartOfDay, todayStartOfDay);

                return {
                    ...event,
                    start: parsedDate,
                    end: parsedDate,
                    // Garante que o status seja 'vencido' se estiver atrasado
                    status: isOverdue ? 'vencido' : 'a vencer', 
                };
            });
            resolve(eventsWithCalculatedStatus);
        }, 800);
    });
}