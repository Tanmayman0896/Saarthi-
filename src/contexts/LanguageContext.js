import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);
  // Available languages - memoized to prevent recreation
  const languages = useMemo(() => [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ], []);

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const initializeLanguage = async () => {
      console.log('Initializing language context...');
      
      const savedLanguage = localStorage.getItem('saarthi-language');
      console.log('Saved language from localStorage:', savedLanguage);
      
      if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
        console.log('Using saved language:', savedLanguage);
        setCurrentLanguage(savedLanguage);
        try {
          await i18n.changeLanguage(savedLanguage);
          console.log('i18n language changed to:', savedLanguage);
        } catch (error) {
          console.error('Error setting saved language:', error);
        }
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        const supportedLang = languages.find(lang => lang.code === browserLang);
        console.log('Browser language detected:', browserLang);
        
        if (supportedLang) {
          setCurrentLanguage(supportedLang.code);
          try {
            await i18n.changeLanguage(supportedLang.code);
            console.log('Language set to browser preference:', supportedLang.code);
          } catch (error) {
            console.error('Error setting browser language:', error);
          }
        }
      }
      
      setIsInitialized(true);
      console.log('Language context initialized');
    };

    // Since we removed HTTP backend, i18n should be ready immediately
    initializeLanguage();  }, [i18n, languages]);
  
  // Change language function - optimized with useCallback
  const changeLanguage = useCallback(async (languageCode) => {
    try {
      console.log('Changing language to:', languageCode);
      
      // Prevent unnecessary changes
      if (currentLanguage === languageCode) {
        console.log('Language already set to:', languageCode);
        return;
      }
      
      await i18n.changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      localStorage.setItem('saarthi-language', languageCode);
      
      // Update document language attribute
      document.documentElement.lang = languageCode;
      
      // Update document direction for RTL languages if needed
      const rtlLanguages = ['ar', 'he', 'ur'];
      document.documentElement.dir = rtlLanguages.includes(languageCode) ? 'rtl' : 'ltr';
      console.log('Language changed successfully to:', languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [currentLanguage, i18n]);

  // Get current language info - optimized with useCallback
  const getCurrentLanguageInfo = useCallback(() => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  }, [currentLanguage, languages]);
  
  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    currentLanguage,
    languages,
    changeLanguage,
    getCurrentLanguageInfo,
    isLoading: !isInitialized,
    isInitialized
  }), [currentLanguage, languages, changeLanguage, getCurrentLanguageInfo, isInitialized]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
