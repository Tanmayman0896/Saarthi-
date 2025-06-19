import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('saarthi-theme');
    console.log('Initializing theme, saved theme:', savedTheme);
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      console.log('Theme loaded from localStorage:', isDark ? 'dark' : 'light');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      console.log('Theme set from system preference:', prefersDark ? 'dark' : 'light');
    }
    
    setIsInitialized(true);
  }, []);  // Apply theme to document - only after initialization
  useEffect(() => {
    if (!isInitialized) return;
    
    const root = document.documentElement;
    const body = document.body;
    
    console.log('Applying theme:', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      body.style.backgroundColor = '#1f2937';
      body.style.color = '#f9fafb';
      console.log('Dark mode applied, classes:', root.classList.toString());
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#111827';
      console.log('Light mode applied, classes:', root.classList.toString());
    }
    
    // Save preference to localStorage
    localStorage.setItem('saarthi-theme', isDarkMode ? 'dark' : 'light');
    console.log('Theme saved to localStorage:', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, isInitialized]);
  const toggleTheme = () => {
    console.log('Theme toggle clicked, current isDarkMode:', isDarkMode);
    setIsDarkMode(prev => {
      const newValue = !prev;
      console.log('Theme changed to:', newValue ? 'dark' : 'light');
      return newValue;
    });
  };
  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light',
    isInitialized
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
