// src/pages/Contracts/index.jsx

import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from 'prop-types';
import styles from './Contracts.module.css';
import { clientsData } from '../../services/mockClientData';
import logo from '../../assets/logo.png';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// --- SUAS FÓRMULAS DE CÁLCULO ---
const calcularJurosSimples = (principal, taxa, tempo) => {
  const i = taxa / 100; // converte % para decimal
  const J = principal * i * tempo;
  const M = principal + J;
  return { montante: M, juros: J };
};

const calcularJurosCompostos = (principal, taxa, tempo) => {
  const i = taxa / 100;
  const M = principal * Math.pow(1 + i, tempo);
  const J = M - principal;
  return { montante: M, juros: J };
};
// ------------------------------------


const Select = ({ label, id, children, ...props }) => (
  <div className={styles.selectWrapper}><label htmlFor={id}>{label}</label><select id={id} {...props}>{children}</select></div>
);
Select.propTypes = { label: PropTypes.string.isRequired, id: PropTypes.string.isRequired, children: PropTypes.node.isRequired };

function Contracts() {
  const [formData, setFormData] = useState({
    clientId: '',
    loanType: 'Pessoal',
    periodValue: 12,
    periodUnit: 'meses',
    amount: '1000',
    interestRate: '5',
    interestType: 'simples', // << NOVO CAMPO NO ESTADO
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleGeneratePdf = (event) => {
    event.preventDefault();
    if (!formData.agreed) { alert('É necessário concordar com os termos.'); return; }
    const selectedClient = clientsData.find(c => c.id === parseInt(formData.clientId));
    if (!selectedClient) { alert('Por favor, selecione um cliente válido.'); return; }
    
    try {
      // --- LÓGICA DE CÁLCULO ATUALIZADA ---
      const principal = parseFloat(formData.amount);
      const rate = parseFloat(formData.interestRate); // A função já divide por 100
      const time = parseInt(formData.periodValue);

      let calculo;
      if (formData.interestType === 'compostos') {
        calculo = calcularJurosCompostos(principal, rate, time);
      } else {
        calculo = calcularJurosSimples(principal, rate, time);
      }

      const { montante: finalAmount, juros: totalInterest } = calculo;
      // ----------------------------------------

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      
      // ... (toda a parte de design do PDF que já estava perfeita, agora usando os novos valores)
      const themeColor = '#FFD700';
      const textColor = '#333333';
      const headerColor = '#1a1a1a';
      let finalY = 0;

      doc.addImage(logo, 'PNG', 40, 30, 80, 80);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(headerColor);
      doc.text("Contrato de Mútuo Financeiro", doc.internal.pageSize.getWidth() / 2, 150, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(textColor);

      finalY = 190;
      doc.text("PARTES CONTRATANTES", 40, finalY);
      finalY += 20;
      doc.setFont('helvetica', 'bold');
      doc.text("CREDORA:", 40, finalY);
      doc.setFont('helvetica', 'normal');
      doc.text("Billity Gestão Financeira LTDA...", 40, finalY + 15, { maxWidth: 515 });
      finalY += 45;
      doc.setFont('helvetica', 'bold');
      doc.text("DEVEDOR(A):", 40, finalY);
      doc.setFont('helvetica', 'normal');
      doc.text(`${selectedClient.name}, portador(a) do CPF nº ${selectedClient.cpf}...`, 40, finalY + 15, { maxWidth: 515 });

      // Tabela de Resumo com os valores corretos
      finalY = 320;
      doc.autoTable({
        startY: finalY,
        head: [['Resumo Financeiro', '']],
        body: [
            ['Valor Emprestado (Principal)', `R$ ${principal.toFixed(2).replace('.', ',')}`],
            ['Taxa de Juros', `${formData.interestRate}% ao ${formData.periodUnit.slice(0, -1)} (${formData.interestType})`],
            ['Período Total', `${time} ${formData.periodUnit}`],
            ['Valor Total dos Juros', `R$ ${totalInterest.toFixed(2).replace('.', ',')}`],
            ['VALOR FINAL A SER PAGO', `R$ ${finalAmount.toFixed(2).replace('.', ',')}`],
        ],
        theme: 'grid',
        headStyles: { fillColor: headerColor, textColor: themeColor, fontStyle: 'bold' },
        footStyles: { fillColor: headerColor, textColor: themeColor, fontStyle: 'bold' },
      });
      finalY = doc.lastAutoTable.finalY;

      // ... (o resto do PDF continua igual)
      finalY += 30;
      doc.setFont('helvetica', 'bold');
      doc.text("CLÁUSULAS CONTRATUAIS", 40, finalY);
      finalY += 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`1. OBJETO: A BILLITY concede ao(à) DEVEDOR(A)... um empréstimo no valor de R$ ${principal.toFixed(2).replace('.', ',')}...`, 40, finalY, { maxWidth: 515, lineHeightFactor: 1.5 });
      finalY += 50;
      doc.text(`2. PAGAMENTO: O valor final de R$ ${finalAmount.toFixed(2).replace('.', ',')} será pago pelo(a) DEVEDOR(A)...`, 40, finalY, { maxWidth: 515, lineHeightFactor: 1.5 });
      finalY += 50;
      doc.text(`3. FORO: Fica eleito o foro da comarca de Porto Velho, RO...`, 40, finalY, { maxWidth: 515, lineHeightFactor: 1.5 });

      finalY = doc.internal.pageSize.height - 100;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1.5);
      doc.line(150, finalY, 450, finalY);
      doc.setFontSize(11);
      doc.setTextColor(textColor);
      doc.text(selectedClient.name, doc.internal.pageSize.getWidth() / 2, finalY + 15, { align: 'center' });
      doc.text("Assinatura do(a) DEVEDOR(A)", doc.internal.pageSize.getWidth() / 2, finalY + 25, { align: 'center' });

      doc.save(`contrato-${selectedClient.name.replace(/\s/g, '_')}.pdf`);

    } catch (error) {
      console.error("ERRO CRÍTICO DURANTE A GERAÇÃO DO PDF:", error);
      alert("Ocorreu um erro inesperado. Verifique o console.");
    }
  };

  return (
    <div className={styles.contractsContainer}>
      <h2>Gerar Novo Contrato</h2>
      <form onSubmit={handleGeneratePdf} className={styles.form}>
        <div className={styles.formRow}>
          <Select label="Selecione o Cliente" id="clientId" name="clientId" value={formData.clientId} onChange={handleChange} required>
            <option value="" disabled>Nome (CPF)</option>
            {clientsData.map(client => (<option key={client.id} value={client.id}>{client.name} ({client.cpf})</option>))}
          </Select>
          <Select label="Tipo de Empréstimo" id="loanType" name="loanType" value={formData.loanType} onChange={handleChange} required>
            <option>Pessoal</option><option>Capital de Giro</option><option>Antecipação de Recebíveis</option>
          </Select>
        </div>
        <div className={styles.formRow}>
          <Input theme="light" label="Valor (R$)" id="amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} placeholder="Ex: 1000.00" required />
          {/* NOVO CAMPO DE SELEÇÃO DE JUROS */}
          <Select label="Tipo de Juros" id="interestType" name="interestType" value={formData.interestType} onChange={handleChange} required>
            <option value="simples">Juros Simples</option>
            <option value="compostos">Juros Compostos</option>
          </Select>
        </div>
        <div className={styles.formRow}>
          <Input theme="light" label="Taxa de Juros (% a.m.)" id="interestRate" name="interestRate" type="number" step="0.1" value={formData.interestRate} onChange={handleChange} placeholder="Ex: 5" required />
          <Input theme="light" label="Período (em meses)" id="periodValue" name="periodValue" type="number" value={formData.periodValue} onChange={handleChange} placeholder="Ex: 12" required />
        </div>
        {/* O seletor de dias/anos foi removido para simplificar o cálculo a.m. */}
        <div className={styles.signatureSection}>
          <input type="checkbox" id="agreed" name="agreed" checked={formData.agreed} onChange={handleChange} required />
          <label htmlFor="agreed">Declaro que li e concordo com os termos do contrato e que as informações prestadas são verdadeiras.</label>
        </div>
        <Button type="submit" style={{ maxWidth: '300px', marginTop: '1rem' }}>Gerar Contrato em PDF</Button>
      </form>
    </div>
  );
}

export default Contracts;