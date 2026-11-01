import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, getToken, setToken } from '../api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(false);
  const [cargando, setCargando] = useState(!!getToken());

  // Al abrir la app, valida el token guardado
  useEffect(() => {
    if (!getToken()) return;
    api.get('/auth/me')
      .then(() => setAutenticado(true))
      .catch(() => setToken(null))
      .finally(() => setCargando(false));
  }, []);

  const login = useCallback(async (usuario, password) => {
    const { data } = await api.post('/auth/login', { usuario, password });
    setToken(data.token);
    setAutenticado(true);
  }, []);

  const logout = useCallback(() => { setToken(null); setAutenticado(false); }, []);

  return <AuthContext.Provider value={{ autenticado, cargando, login, logout }}>{children}</AuthContext.Provider>;
}
