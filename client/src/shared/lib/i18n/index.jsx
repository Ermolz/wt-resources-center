import { createContext, useContext, useEffect, useState } from 'react';
import enTranslations from './locales/en';
import ukTranslations from './locales/uk';

const I18nContext = createContext(null);

const translations = {
  en: enTranslations,
  uk: ukTranslations,
};

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  }
  return 'en';
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => getInitialLanguage());

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

