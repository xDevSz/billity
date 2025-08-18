// src/components/ui/Card/index.jsx

import styles from './Card.module.css';

// O componente recebe uma propriedade especial "children",
// que é todo o conteúdo que você coloca entre <Card> e </Card>
function Card({ children }) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}

export default Card;