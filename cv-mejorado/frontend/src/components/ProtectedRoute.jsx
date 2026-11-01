import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { autenticado, cargando } = useAuth();
  if (cargando) return <p className="center-msg">Verificando sesión…</p>;
  return autenticado ? children : <Navigate to="/admin/login" replace />;
}
