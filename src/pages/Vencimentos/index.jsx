// src/pages/Vencimentos/index.jsx
import { useState, useCallback, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types'; // <--- 1. IMPORTAÇÃO NECESSÁRIA

import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Vencimentos.module.css';

import VencimentoModal from '../../components/vencimentos/VencimentoModal';
import { fetchVencimentos } from '../../services/vencimentosService'; // Importação do serviço

// --- Configurações Iniciais ---
const locales = { 'pt-BR': ptBR };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
const messages = { allDay: 'Dia todo', previous: '‹', next: '›', today: 'Hoje', month: 'Mês', week: 'Semana', day: 'Dia', agenda: 'Agenda', date: 'Data', time: 'Hora', event: 'Evento', noEventsInRange: 'Não há vencimentos neste período.' };

// --- FUNÇÃO AUXILIAR PARA CRIAR UM OBJETO DE DATA LIMPA ---
const getCleanDate = (date) => format(date, 'yyyy-MM-dd');

function Vencimentos() {
    // Estado inicial de events vazio e um estado para loading
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // Outubro de 2025

  // --- Carrega os dados do serviço ---
  useEffect(() => {
    setLoading(true);
    fetchVencimentos().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

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
    // CORRIGIDO: Remover o alert() e usar algo menos intrusivo no futuro.
    console.log(`Adicionar novo vencimento para a data: ${selectedDate.toLocaleDateString()}`);
  };

  // --- Componente para customizar o NÚMERO do dia ---
  const CustomDateHeader = ({ label, date }) => {
    // Filtra os eventos com base na data do dia
    const dayEvents = events.filter(e => getCleanDate(e.start) === getCleanDate(date));
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
  
  // 2. ADICIONA O PropTypes para CustomDateHeader
  CustomDateHeader.propTypes = {
      label: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
  };
  
  if (loading) {
    return (
      <div className={styles.vencimentosContainer} style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Carregando Calendário...</h2>
      </div>
    );
  }

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
            events={events} // Usa os eventos carregados do serviço
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
                dateHeader: CustomDateHeader,
              }
            }}
          />
        </div>
      </div>

      {modalOpen && (
        <VencimentoModal 
          date={selectedDate}
          // Filtra os eventos para o modal usando a função auxiliar
          events={events.filter(e => getCleanDate(e.start) === getCleanDate(selectedDate))}
          onClose={handleCloseModal}
          onAddEvent={handleAddEvent}
        />
      )}
    </>
  );
}

export default Vencimentos;
