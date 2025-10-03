// src/hooks/useInterestCalculator.js

import { useState, useCallback } from 'react';

/**
 * Hook para simular o cálculo de juros compostos.
 * No futuro, a lógica complexa será movida para o backend (API).
 * * @returns {object} { calculate, result, loading }
 */
export const useInterestCalculator = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Simula o cálculo de juros com base nos parâmetros.
     * @param {number} principal - Valor principal do empréstimo.
     * @param {number} rate - Taxa de juros mensal (ex: 5.0 para 5%).
     * @param {number} term - Prazo em meses.
     */
    const calculate = useCallback(async (principal, rate, term) => {
        if (!principal || !rate || !term) {
            setResult(null);
            return;
        }

        setLoading(true);
        // Simulação da chamada API/Backend para calcular juros
        
        await new Promise(resolve => setTimeout(resolve, 800)); // Simula latência de rede

        // --- LÓGICA DE CÁLCULO (MOCK) ---
        const monthlyRate = rate / 100; // Converte % para decimal (ex: 0.05)
        
        // Simples cálculo de juros compostos para o valor futuro (FV)
        const futureValue = principal * Math.pow((1 + monthlyRate), term);
        const totalInterest = futureValue - principal;
        
        // Simulação de parcelas (simplificado: divide o FV pelo prazo)
        const monthlyPayment = futureValue / term;
        
        setResult({
            principal: principal,
            term: term,
            rate: rate,
            futureValue: futureValue,
            totalInterest: totalInterest,
            monthlyPayment: monthlyPayment,
        });

        setLoading(false);
    }, []);

    return { calculate, result, loading };
};