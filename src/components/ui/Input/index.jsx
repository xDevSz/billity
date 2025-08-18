// src/components/ui/Input/index.jsx

import styles from './Input.module.css';

// Recebemos várias props para tornar o Input reutilizável
// label: O texto que aparece acima do campo
// id: Um identificador único para o campo
// ...props: Repassa qualquer outra propriedade (type, value, onChange, placeholder, etc.)
function Input({ label, id, ...props }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.input} {...props} />
    </div>
  );
}

export default Input;