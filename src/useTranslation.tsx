import { createContext, useContext, useState, ReactNode } from 'react';
import enTranslations from './locale/en.json';
import deTranslations from './locale/de.json';

// Define available languages
type Language = 'en' | 'de';

// Create the translations object
const translations: Record<Language, any> = {
  en: enTranslations,
  de: deTranslations,
};

// Create the context
const TranslationContext = createContext<any>(null);

// Custom provider component
export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const t = (key: string) => {
    const translation = translations[currentLanguage][key];
    if (!translation) {
      console.warn(
        `Missing translation for key: "${key}" in language "${currentLanguage}"`,
      );
    }
    return translation || key;
  };

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <TranslationContext.Provider value={{ t, changeLanguage, currentLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook to use translation
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
