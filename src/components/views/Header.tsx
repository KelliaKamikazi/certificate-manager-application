import React, { useState } from 'react';
import { useTranslation } from '../../useTranslation'; // Adjust the import path
import '../../styles/header.css';

const Header: React.FC = () => {
  const { t, changeLanguage } = useTranslation(); // Use your custom hook
  const [language, setLanguage] = useState('English');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    changeLanguage(lang === 'English' ? 'en' : 'de'); // Pass the language code to your custom hook
  };

  return (
    <header className="title">
      <h1>{t('title')}</h1>
      <div className="lang-dropdown-container">
        <span>{t('language')}:</span>
        <div className="languages">
          <button className="lang-button">{language} ▼</button>
          <div className="dropdown-content">
            <a
              href="#"
              onClick={() => handleLanguageChange('English')}
            >
              English
            </a>
            <a
              href="#"
              onClick={() => handleLanguageChange('German')}
            >
              German
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
