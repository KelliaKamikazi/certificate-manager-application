import Header from './components/views/Header';
import Sidebar from './components/Sidebar';
import AppRoutes from './Route';
import './App.css';
import { sampleCertificates } from './components/data/data';
import { addData } from './utils/indexedDB';
import { useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    const initializeDB = async () => {
      await addData(sampleCertificates);
    };

    initializeDB().catch(console.error);
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="middle">
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
