// src/contexts/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('billityUser');
    return savedUser
      ? JSON.parse(savedUser)
      : { isLoggedIn: true, profileComplete: false };
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

  const value = {
    user,
    isProfileModalOpen,
    closeProfileModal,
    openProfileModal,
    completeProfile,
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