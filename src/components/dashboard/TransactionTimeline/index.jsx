// src/components/dashboard/TransactionTimeline/index.jsx
import PropTypes from 'prop-types';
import styles from './TransactionTimeline.module.css';
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi';

function TransactionTimeline({ transactions }) {
  return (
    <div className={styles.timeline}>
      <h3>Linha do Tempo (Últimas Transações)</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            <div className={tx.type === 'recebimento' ? styles.iconRecebido : styles.iconEmprestado}>
              {tx.type === 'recebimento' ? <BiDownArrowAlt /> : <BiUpArrowAlt />}
            </div>
            <div className={styles.details}>
              <span>{tx.description}</span>
              <small>{tx.date}</small>
            </div>
            <span className={tx.type === 'recebimento' ? styles.amountRecebido : styles.amountEmprestado}>
              {tx.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

TransactionTimeline.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionTimeline;