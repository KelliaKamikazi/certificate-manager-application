import React, { useEffect, useState } from 'react';
import '../../styles/example2.css';
import { useTranslation } from '../../useTranslation';

const Example2: React.FC = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className="example">
      <h1>{t('example2')}</h1>
      <p>{message ? message : 'Loading message...'}</p>
    </div>
  );
};

export default Example2;
