import { Route, Routes } from 'react-router-dom';
import NewCertificate from './components/NewCertificate';
import Home from './components/Home';
import Example1 from './components/Example1';
import Example2 from './components/Example2';
import Example3 from './components/Example3';
import NotFound from './components/Notfound';

const AppRoutes: React.FC = () => {
  return (
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
        path="/NewCertificate"
        element={<NewCertificate />}
      />
      <Route
        path="/example2"
        element={<Example2 />}
      />
      <Route
        path="/example3"
        element={<Example3 />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;
