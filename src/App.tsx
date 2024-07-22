import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AppRoutes from './Route';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="middle">
        <Sidebar />
        <main>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
