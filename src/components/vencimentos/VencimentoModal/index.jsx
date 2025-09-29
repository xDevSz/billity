// src/components/vencimentos/VencimentoModal/index.jsx
import PropTypes from 'prop-types';
import styles from './VencimentoModal.module.css';
import { BiX, BiCalendarPlus, BiCalendarX, BiCalendarCheck } from 'react-icons/bi';

const VencimentoModal = ({ date, events, onClose, onAddEvent }) => {
  if (!date) return null;

  const getStatusIcon = (status) => {
    if (status === 'vencido') return <BiCalendarX className={styles.vencidoIcon} />;
    return <BiCalendarCheck className={styles.aVencerIcon} />;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}><BiX /></button>
        <div className={styles.modalHeader}>
          <h3>Vencimentos de {date.toLocaleDateString('pt-BR')}</h3>
        </div>
        <div className={styles.eventsList}>
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className={styles.eventItem}>
                {getStatusIcon(event.status)}
                <div className={styles.eventDetails}>
                  <strong>{event.title}</strong>
                  <span>{event.amount}</span>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noEvents}>Nenhum vencimento para esta data.</p>
          )}
        </div>
        <button className={styles.addButton} onClick={onAddEvent}>
          <BiCalendarPlus /> Adicionar Novo Vencimento
        </button>
      </div>
    </div>
  );
};

VencimentoModal.propTypes = {
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddEvent: PropTypes.func.isRequired,
};

export default VencimentoModal;