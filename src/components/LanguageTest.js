import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageTest = () => {
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log('LanguageTest mounted');
    console.log('Current language from context:', currentLanguage);
    console.log('Current language from i18n:', i18n.language);
    console.log('Available languages:', languages);
    console.log('i18n is initialized:', i18n.isInitialized);
  }, [currentLanguage, i18n.language, languages, i18n.isInitialized]);

  const testLanguageChange = (langCode) => {
    console.log('Testing language change to:', langCode);
    changeLanguage(langCode);
  };

  return (
    <div className="fixed top-20 left-4 z-50 p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900 shadow-lg border border-yellow-300 dark:border-yellow-600 max-w-sm">
      <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Language Test</h3>
      <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
        Context Lang: <span className="font-bold">{currentLanguage}</span>
      </p>
      <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
        i18n Lang: <span className="font-bold">{i18n.language}</span>
      </p>
      <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
        Test Translation: <span className="font-bold">{t('welcome', 'Welcome')}</span>
      </p>
      <div className="flex flex-col gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => testLanguageChange(lang.code)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              currentLanguage === lang.code
                ? 'bg-yellow-600 text-white'
                : 'bg-yellow-200 hover:bg-yellow-300 text-yellow-800'
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageTest;
