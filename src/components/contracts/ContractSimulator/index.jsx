// src/components/contracts/ContractSimulator/index.jsx

import { useState } from 'react';
import styles from './ContractSimulator.module.css';
import { useInterestCalculator } from '../../../hooks/useInterestCalculator';

// Componentes UI
import Card from '../../ui/Card';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

// Utilitários
import { currencyFormatter } from '../../../utils/currencyFormatter';
import { BiCalculator, BiMoney, BiCalendar, BiPercent } from 'react-icons/bi';
import { useTheme } from '../../../contexts/ThemeContext'; // Para passar o tema ao Input

function ContractSimulator() {
    const { calculate, result, loading } = useInterestCalculator();
    const { theme } = useTheme(); // Pega o tema para os Inputs

    // Valores iniciais para simulação
    const [principal, setPrincipal] = useState(10000);
    const [rate, setRate] = useState(5.0);
    const [term, setTerm] = useState(12);

    const handleSubmit = (e) => {
        e.preventDefault();
        calculate(principal, rate, term);
    };

    return (
        <Card className={styles.simulatorCard}>
            <header className={styles.header}>
                <BiCalculator className={styles.headerIcon} />
                <h2>Simulador de Contratos</h2>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* CAMPOS DE ENTRADA */}
                <div className={styles.inputGrid}>
                    <Input 
                        label="Valor Principal (R$)" 
                        id="principal" 
                        type="number" 
                        step="1000"
                        theme={theme}
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        required
                    />
                    <Input 
                        label="Taxa de Juros Mensal (%)" 
                        id="rate" 
                        type="number" 
                        step="0.1"
                        theme={theme}
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        required
                    />
                    <Input 
                        label="Prazo (Meses)" 
                        id="term" 
                        type="number" 
                        theme={theme}
                        value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                        required
                    />
                </div>
                
                <Button type="submit" disabled={loading} style={{ alignSelf: 'center', maxWidth: '300px' }}>
                    {loading ? 'Calculando...' : 'Simular Contrato'}
                </Button>
            </form>

            {/* RESULTADOS DA SIMULAÇÃO */}
            {result && (
                <div className={styles.results}>
                    <h3 className={styles.resultsTitle}>Resultados da Simulação</h3>
                    <div className={styles.resultGrid}>
                        <div className={styles.resultItem}>
                            <BiMoney />
                            <span>Valor Total a Pagar</span>
                            <strong>{currencyFormatter(result.futureValue)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <BiPercent />
                            <span>Juros Totais</span>
                            <strong>{currencyFormatter(result.totalInterest)}</strong>
                        </div>
                        <div className={styles.resultItem}>
                            <BiCalendar />
                            <span>Valor da Parcela Mensal</span>
                            <strong>{currencyFormatter(result.monthlyPayment)}</strong>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}

export default ContractSimulator;
