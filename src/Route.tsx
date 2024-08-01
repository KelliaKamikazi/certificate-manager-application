import { Route, Routes } from 'react-router-dom';
import CertificateForm from './components/views/CertificateForm';
import Home from './components/views/Home';
import Example1 from '../src/components/views/Example1';
import Example2 from '../src/components/views/Example2';
import Example3 from '../src/components/views/Example3';
import NotFound from '../src/components/views/Notfound';

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
        path="/CertificateForm/:certificateId"
        element={<CertificateForm />}
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
