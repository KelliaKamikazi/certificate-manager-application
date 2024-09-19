import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../useTranslation';
import '../../styles/header.css';
import { fetchParticipants } from '../../utils/indexedDB';
import { Participant } from '../data/data';
import { useLocalStorageChange } from '../../useLocalStorageChange';

const Header: React.FC = () => {
  const { t, changeLanguage } = useTranslation();
  const [language, setLanguage] = useState('English');
  const [participants, setParticipants] = useState<Participant[]>([]);

  const selectedParticipant = useLocalStorageChange('participant');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    changeLanguage(lang === 'English' ? 'en' : 'de');
  };

  const handleParticipantSelect = (participantName: string) => {
    localStorage.setItem('participant', participantName);
  };

  const handleEnglishSelect = () => handleLanguageChange('English');
  const handleGermanSelect = () => handleLanguageChange('German');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedParticipants = await fetchParticipants();
        setParticipants(fetchedParticipants);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="title">
      <h1>{t('title')}</h1>
      <div className="header-right">
        <div className="lang-dropdown-container">
          <span>{t('user')}:</span>
          <div className="languages">
            <button className="lang-button">{selectedParticipant} ▼</button>
            <div className="dropdown-content">
              {participants.map((participant, index) => (
                <a
                  key={index}
                  onClick={() => handleParticipantSelect(participant.name)}
                >
                  {participant.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lang-dropdown-container">
          <span>{t('language')}:</span>
          <div className="languages">
            <button className="lang-button">{language} ▼</button>
            <div className="dropdown-content">
              <a
                href="#"
                onClick={handleEnglishSelect}
              >
                English
              </a>
              <a
                href="#"
                onClick={handleGermanSelect}
              >
                German
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
