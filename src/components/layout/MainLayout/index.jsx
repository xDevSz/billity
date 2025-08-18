// src/components/layout/MainLayout/index.jsx

import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header'; // 1. Importamos o Header
import CompleteProfileModal from '../../CompleteProfileModal'; 
import { useAuth } from '../../../contexts/AuthContext'; 

// 2. Importamos o CSS para o layout responsivo
import styles from './MainLayout.module.css';

function MainLayout() {
  const { user, isProfileModalOpen } = useAuth();

  return (
    // 3. Usamos as classes do nosso arquivo CSS
    <div className={styles.layoutContainer}>
      <Sidebar />
      <div className={styles.content}>
        <Header /> {/* 4. Adicionamos o Header aqui */}
        <main>
          {isProfileModalOpen && !user.profileComplete && <CompleteProfileModal />}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;