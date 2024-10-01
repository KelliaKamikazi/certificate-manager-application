import Header from "./components/views/Header";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./Route";
import "./App.css";
const App: React.FC = () => {
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
