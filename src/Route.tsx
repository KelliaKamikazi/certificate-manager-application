import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./components/Home'));
const Example1 = lazy(() => import('./components/Example1'));
const Example2 = lazy(() => import('./components/Example2'));
const Example3 = lazy(() => import('./components/Example3'));
const Notfound = lazy(() => import('./components/Notfound'));

//while the route is being switched message Loading...
const Loading = () => <div>Loading...</div>;

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
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
        <Route
          path="*"
          element={<Notfound />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
