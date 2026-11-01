import axios from 'axios';

const TOKEN_KEY = 'cv_token';
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (t) => (t ? sessionStorage.setItem(TOKEN_KEY, t) : sessionStorage.removeItem(TOKEN_KEY));

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 8000,
});

// Adjunta el token JWT a cada petición
api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

// Mensaje de error legible para mostrar al usuario
export const errorMessage = (e, fallback = 'Ocurrió un error. Intenta de nuevo.') =>
  e.response?.data?.error || (e.code === 'ERR_NETWORK' ? 'No hay conexión con el servidor.' : fallback);
