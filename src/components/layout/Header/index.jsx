// src/components/layout/Header/index.jsx

import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { BiUserCircle } from 'react-icons/bi'; // Ícone de usuário

function Header() {
  // No futuro, o nome viria do nosso AuthContext
  const userName = "Victor Eduardo"; 

  return (
    <header className={styles.header}>
      {/* Opcional: Título da página atual */}
      <h1 className={styles.title}>Início</h1>

      <div className={styles.userMenu}>
        <Link to="/perfil">
          <BiUserCircle />
          <span>{userName}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;