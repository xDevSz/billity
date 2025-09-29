// src/components/dashboard/TransactionTimeline/index.jsx
import PropTypes from 'prop-types';
import styles from './TransactionTimeline.module.css';
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi';

const TransactionTimeline = ({ transactions }) => {
  return (
    <div className={styles.timeline}>
      <h3 className={styles.title}>Últimas Transações</h3>
      <ul className={styles.list}>
        {transactions.map(tx => (
          <li key={tx.id} className={styles.listItem}>
            <div className={`${styles.icon} ${tx.type === 'recebimento' ? styles.income : styles.expense}`}>
              {tx.type === 'recebimento' ? <BiUpArrowAlt /> : <BiDownArrowAlt />}
            </div>
            <div className={styles.details}>
              <span className={styles.description}>{tx.description}</span>
              <span className={styles.date}>{new Date(tx.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
            </div>
            <span className={`${styles.amount} ${tx.type === 'recebimento' ? styles.income : styles.expense}`}>
              {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

TransactionTimeline.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionTimeline;