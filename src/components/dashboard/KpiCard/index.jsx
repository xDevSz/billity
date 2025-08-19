// src/components/dashboard/KpiCard/index.jsx
import PropTypes from 'prop-types';
import styles from './KpiCard.module.css';

function KpiCard({ title, value, icon, iconBgColor }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} style={{ backgroundColor: iconBgColor }}>
        {icon}
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
}

KpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  iconBgColor: PropTypes.string,
};

KpiCard.defaultProps = {
  iconBgColor: '#e0f2f1', 
};

export default KpiCard;