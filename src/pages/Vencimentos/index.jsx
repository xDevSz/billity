// src/pages/Vencimentos/index.jsx

import { useState } from 'react';
import PropTypes from 'prop-types'; // Importe o PropTypes
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Vencimentos.module.css';

// --- Configuração do Localizador ---
const locales = { 'pt-BR': ptBR };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// --- Dados Fictícios ---
const mockVencimentos = [
  { id: 1, title: 'João da Silva Sauro', amount: 'R$ 250,50', start: new Date(2025, 7, 15), end: new Date(2025, 7, 15), status: 'vencido' },
  { id: 2, title: 'Maria Oliveira Costa', amount: 'R$ 1.200,00', start: new Date(2025, 7, 28), end: new Date(2025, 7, 28), status: 'a vencer' },
  { id: 3, title: 'Carlos Lima', amount: 'R$ 300,00', start: new Date(2025, 8, 5), end: new Date(2025, 8, 5), status: 'a vencer' },
];

// --- Tradução das mensagens ---
const messages = { allDay: 'Dia todo', previous: '<', next: '>', today: 'Hoje', month: 'Mês', week: 'Semana', day: 'Dia', agenda: 'Agenda', date: 'Data', time: 'Hora', event: 'Evento', noEventsInRange: 'Não há vencimentos neste período.' };

// --- Componente customizado para o Evento ---
const EventComponent = ({ event }) => (
  <div className={styles.event}>
    <strong>{event.title}</strong>
    <span>{event.amount}</span>
  </div>
);

// Validação de Props para o EventComponent
EventComponent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
  }).isRequired,
};

// --- Componente Principal da Página ---
function Vencimentos() {
  // CORREÇÃO: Removemos o 'setEvents' que não estava sendo usado
  const [events] = useState(mockVencimentos);
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventPropGetter = (event) => {
    const backgroundColor = event.status === 'vencido' ? '#dc3545' : '#198754';
    const style = { backgroundColor, borderRadius: '5px', opacity: 0.8, color: 'white', border: '0px', display: 'block' };
    return { style };
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };
  
  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };
  
  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const years = [2024, 2025, 2026];
  const months = Array.from({ length: 12 }, (e, i) => new Date(null, i + 1, null).toLocaleDateString("pt-BR", { month: "long" }));


  return (
    <div className={styles.vencimentosContainer}>
      <div className={styles.header}>
        <h2>Calendário de Vencimentos</h2>
        <div className={styles.filters}>
          <select onChange={handleMonthChange} value={currentDate.getMonth()}>
            {months.map((month, index) => (
               <option key={index} value={index}>{month.charAt(0).toUpperCase() + month.slice(1)}</option>
            ))}
          </select>
          <select onChange={handleYearChange} value={currentDate.getFullYear()}>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          messages={messages}
          eventPropGetter={eventPropGetter}
          components={{ event: EventComponent }}
          date={currentDate}
          onNavigate={handleNavigate}
          views={['month']}
        />
      </div>
    </div>
  );
}

export default Vencimentos;