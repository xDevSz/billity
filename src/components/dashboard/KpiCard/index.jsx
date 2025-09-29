// src/components/dashboard/KpiCard/index.jsx
import PropTypes from 'prop-types';
import styles from './KpiCard.module.css';

const KpiCard = ({ title, value, icon }) => {
  return (
    <div className={styles.kpiCard}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default KpiCard;