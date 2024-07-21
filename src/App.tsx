import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Example1 from './components/Example1';
import Example2 from './components/Example2';
import Example3 from './components/Example3';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/example1"
            element={<Example1 />}
          />
          <Route
            path="/example2"
            element={<Example2 />}
          />
          <Route
            path="/example3"
            element={<Example3 />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
