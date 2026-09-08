import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../constants/theme';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleFavorite = (machineId) => {
    setFavorites((prev) => {
      if (prev.includes(machineId)) {
        return prev.filter(id => id !== machineId);
      }
      return [...prev, machineId];
    });
  };

  const COLORS = isDarkMode ? darkTheme : lightTheme;

  return (
    <AppContext.Provider value={{ isDarkMode, toggleDarkMode, favorites, toggleFavorite, COLORS }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
