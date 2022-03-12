import AuthProvider from '../providers/Auth';
import Routes from './Routes';

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes />
      </div>
    </AuthProvider>
  );
}
