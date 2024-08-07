import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/header.css';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('English');

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang === 'English' ? 'en' : 'de');
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
              onClick={() => changeLanguage('English')}
            >
              English
            </a>
            <a
              href="#"
              onClick={() => changeLanguage('German')}
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
