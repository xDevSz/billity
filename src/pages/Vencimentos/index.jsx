// src/pages/Vencimentos/index.jsx
import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Vencimentos.module.css';

import VencimentoModal from '../../components/vencimentos/VencimentoModal';

// --- Configurações Iniciais ---
const locales = { 'pt-BR': ptBR };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
const messages = { allDay: 'Dia todo', previous: '‹', next: '›', today: 'Hoje', month: 'Mês', week: 'Semana', day: 'Dia', agenda: 'Agenda', date: 'Data', time: 'Hora', event: 'Evento', noEventsInRange: 'Não há vencimentos neste período.' };

// --- Dados Fictícios ---
const mockVencimentos = [
  { id: 1, title: 'João da Silva Sauro', amount: 'R$ 250,50', start: new Date(2025, 8, 15), end: new Date(2025, 8, 15), status: 'vencido' },
  { id: 2, title: 'Maria Oliveira Costa', amount: 'R$ 1.200,00', start: new Date(2025, 8, 28), end: new Date(2025, 8, 28), status: 'a vencer' },
  { id: 3, title: 'Carlos Lima', amount: 'R$ 300,00', start: new Date(2025, 9, 5), end: new Date(2025, 9, 5), status: 'a vencer' },
  { id: 4, title: 'Ana Souza', amount: 'R$ 750,00', start: new Date(2025, 8, 15), end: new Date(2025, 8, 15), status: 'a vencer' },
  { id: 5, title: 'Pedro Martins', amount: 'R$ 500,00', start: new Date(2025, 8, 12), end: new Date(2025, 8, 12), status: 'vencido' },
];

function Vencimentos() {
  const [events] = useState(mockVencimentos);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // Setembro de 2025

  // --- Controle do Modal ---
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = useCallback((slotInfo) => {
    setSelectedDate(slotInfo.start);
    setModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleAddEvent = () => {
    alert(`Adicionar novo vencimento para a data: ${selectedDate.toLocaleDateString()}`);
  };

  // --- NOVO: Componente para customizar o NÚMERO do dia ---
  const CustomDateHeader = ({ label, date }) => {
    const dayEvents = events.filter(e => format(e.start, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    const hasVencido = dayEvents.some(e => e.status === 'vencido');
    const hasAVencer = dayEvents.some(e => e.status === 'a vencer');

    let statusClass = '';
    // Vencido tem prioridade sobre "a vencer" na cor
    if (hasVencido) {
      statusClass = styles.vencido;
    } else if (hasAVencer) {
      statusClass = styles.aVencer;
    }

    return (
      // O span com o número do dia recebe a classe de status
      <span className={`${styles.dayNumber} ${statusClass}`}>
        {label}
      </span>
    );
  };
  
  return (
    <>
      <div className={styles.vencimentosContainer}>
        <div className={styles.header}>
          <h2>Calendário de Vencimentos</h2>
          <div className={styles.legend}>
            <span><div className={`${styles.dayNumber} ${styles.aVencer}`}></div> A Vencer</span>
            <span><div className={`${styles.dayNumber} ${styles.vencido}`}></div> Vencido</span>
          </div>
        </div>

        <div className={styles.calendarWrapper}>
          <Calendar
            localizer={localizer}
            events={[]} // Os eventos agora são indicados nos dias, não aqui
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 200px)' }}
            messages={messages}
            date={currentDate}
            onNavigate={setCurrentDate}
            onSelectSlot={handleSelectSlot}
            selectable
            views={['month']}
            components={{
              month: {
                // AQUI está a mágica: substituímos o cabeçalho do dia
                dateHeader: CustomDateHeader,
              }
            }}
          />
        </div>
      </div>

      {modalOpen && (
        <VencimentoModal 
          date={selectedDate}
          events={events.filter(e => format(e.start, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))}
          onClose={handleCloseModal}
          onAddEvent={handleAddEvent}
        />
      )}
    </>
  );
}

export default Vencimentos;