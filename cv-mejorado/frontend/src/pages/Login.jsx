import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../api';

export default function Login() {
  const { autenticado, login } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  if (autenticado) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await login(usuario, password); navigate('/admin', { replace: true }); }
    catch (ex) { setErr(errorMessage(ex, 'No se pudo iniciar sesión.')); setBusy(false); }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <img src="/img/logo.png" alt="" width="44" height="44" />
        <h3>Panel administrador</h3>
        <div className="field"><label htmlFor="usuario">Usuario</label>
          <input id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" required /></div>
        <div className="field"><label htmlFor="password">Contraseña</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></div>
        {err && <p className="alert error" role="alert">{err}</p>}
        <button className="btn-download" disabled={busy}><LogIn size={16} /> {busy ? 'Entrando…' : 'Ingresar'}</button>
        <Link to="/" className="muted back">← Volver al sitio</Link>
      </form>
    </div>
  );
}
