import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { TranslationProvider } from './useTranslation'; // Import your custom provider

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  process.env.NODE_ENV === 'development' ? (
    <StrictMode>
      <TranslationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TranslationProvider>
    </StrictMode>
  ) : (
    <TranslationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TranslationProvider>
  ),
);
