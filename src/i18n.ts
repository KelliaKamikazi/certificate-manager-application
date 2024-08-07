import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import EN from './locale/en.json';
import DE from './locale/de.json';

// The translations
const resources = {
  en: {
    translation: EN,
  },
  de: {
    translation: DE,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    debug: true, // Enable debug logging
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
