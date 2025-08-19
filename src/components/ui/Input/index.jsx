// src/components/ui/Input/index.jsx

import styles from './Input.module.css';
import PropTypes from 'prop-types';

// Adicionamos a prop "theme", com 'dark' sendo o padrão
function Input({ label, id, theme = 'dark', ...props }) {
  return (
    <div className={styles.inputWrapper}>
      {/* Aplicamos a theme como um atributo de dados */}
      <label htmlFor={id} className={styles.label} data-theme={theme}>
        {label}
      </label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  theme: PropTypes.string, // 'dark' ou 'light'
};

export default Input;