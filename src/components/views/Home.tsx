import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/home.css';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="start">
      <h1>{t('start')}</h1>
    </div>
  );
};

export default Home;
