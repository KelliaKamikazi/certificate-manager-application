import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Title from './components/Title';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="app">
      <Title />
      <Sidebar />
    </div>
  );
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  process.env.DEV ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  ),
);
