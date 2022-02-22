import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const LazyAbout = React.lazy(() => import('../pages/About'));
const LazyNoMatch = React.lazy(() => import('../pages/NoMatch'));

const Routes = () => {
  return (
    <React.Suspense fallback="Loading...">
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<LazyAbout />} />
        <Route path="*" element={<LazyNoMatch />} />
      </ReactRoutes>
    </React.Suspense>
  );
};

export default Routes;
