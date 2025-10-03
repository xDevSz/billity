// src/contexts/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('billityUser');
    
    // Define um usuário inicial genérico para a demo
    const initialDemoUser = { 
      isLoggedIn: true, 
      profileComplete: true, 
      nome: "Admin BILLITY", // Dado genérico
      email: "admin@billity.com", // Dado genérico
      telefone: "(99) 99999-9999",
    };

    // Se já houver um usuário salvo, usa-o. Caso contrário, usa o usuário de demonstração.
    return savedUser
      ? JSON.parse(savedUser)
      : initialDemoUser;
  });

  useEffect(() => {
    localStorage.setItem('billityUser', JSON.stringify(user));
  }, [user]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(() => {
    const isComplete = user.profileComplete;
    const wasDismissed = sessionStorage.getItem('billityModalDismissed') === 'true';
    return !isComplete && !wasDismissed;
  });

  const closeProfileModal = () => {
    sessionStorage.setItem('billityModalDismissed', 'true');
    setIsProfileModalOpen(false);
  };
  
  const openProfileModal = () => {
    sessionStorage.removeItem('billityModalDismissed');
    setIsProfileModalOpen(true);
  };

  const completeProfile = () => {
    setUser(currentUser => ({ ...currentUser, profileComplete: true }));
    closeProfileModal();
  };

  // FUNÇÃO NECESSÁRIA PARA A TAREFA: Atualiza os dados de perfil do usuário logado
  const updateUserProfile = (newProfileData) => {
    setUser(prev => ({
      ...prev,
      ...newProfileData, 
    }));
  };

  const value = {
    user,
    isProfileModalOpen,
    closeProfileModal,
    openProfileModal,
    completeProfile,
    updateUserProfile, // <-- Adicionado
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
