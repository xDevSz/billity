// src/contexts/ThemeContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Tenta pegar o tema salvo ou usa 'dark' como padrão
    return localStorage.getItem('billityTheme') || 'dark';
  });

  useEffect(() => {
    // Aplica o tema no corpo do documento e salva a preferência
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('billityTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  return useContext(ThemeContext);
};