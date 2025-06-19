import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeTest = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 left-4 z-50 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-600">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Theme Test</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Current mode: <span className="font-bold">{isDarkMode ? 'Dark' : 'Light'}</span>
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        HTML class: {document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
      </p>
      <button 
        onClick={toggleTheme}
        className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeTest;
