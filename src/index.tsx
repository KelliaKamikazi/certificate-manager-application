import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return <h1>Hey there champ!! How are you doing?</h1>;
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
