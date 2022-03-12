import React, { useContext, useEffect } from 'react';
import { Routes as ReactRoutes, Route, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import { AuthContext } from '../providers/Auth';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

const LazyAbout = React.lazy(() => import('../pages/About'));
const LazyNoMatch = React.lazy(() => import('../pages/NoMatch'));

const Routes = () => {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    user ? navigate('/profile') : navigate('login');
  }, []);

  return (
    <React.Suspense fallback="Loading...">
      <Navbar />
      <ReactRoutes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <LazyAbout />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/profile" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path="/about" element={<LazyAbout />} />
        <Route path="*" element={<LazyNoMatch />} />
      </ReactRoutes>
    </React.Suspense>
  );
};

export default Routes;
