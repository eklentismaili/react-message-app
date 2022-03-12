import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../providers/Auth';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
