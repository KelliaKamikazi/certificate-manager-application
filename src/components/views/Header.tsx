import React, { useState } from 'react';
import '../../styles/header.css';

const Header: React.FC = () => {
  const [language, setLanguage] = useState('English');

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <header className="title">
      <h1>DCCS Tuzla</h1>
      <div className="lang-dropdown-container">
        <span>Language:</span>
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
