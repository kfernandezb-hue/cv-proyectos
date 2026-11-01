import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut, Home, X } from 'lucide-react';
import { api, errorMessage } from '../api';
import { useAuth } from '../context/AuthContext';
import { PERSONAS, getPersona } from '../data';
import ExperienceForm from '../components/ExperienceForm';

export default function Admin() {
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | {} (nuevo) | experiencia
  const [toDelete, setToDelete] = useState(null);
  const [toast, setToast] = useState('');

  const aviso = (t) => { setToast(t); setTimeout(() => setToast(''), 3000); };

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setItems((await api.get('/experiencias')).data); }
    catch (e) { setError(errorMessage(e, 'No se pudieron cargar las experiencias.')); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  // Si el token expiró, el servidor responde 401: cerramos sesión
  const handle401 = (e) => { if (e.response?.status === 401) logout(); };

  const save = async (datos) => {
    try {
      if (editing?._id) await api.put(`/experiencias/${editing._id}`, datos);
      else await api.post('/experiencias', datos);
      setEditing(null); aviso(editing?._id ? 'Experiencia actualizada ✅' : 'Experiencia creada ✅');
      load();
    } catch (e) { handle401(e); throw new Error(errorMessage(e, 'No se pudo guardar.')); }
  };

  const confirmDelete = async () => {
    try { await api.delete(`/experiencias/${toDelete._id}`); aviso('Experiencia eliminada 🗑️'); load(); }
    catch (e) { handle401(e); aviso(errorMessage(e, 'No se pudo eliminar.')); }
    setToDelete(null);
  };

  return (
    <div className="admin">
      <header className="admin__bar">
        <h2>Panel administrador</h2>
        <div className="admin__actions">
          <Link to="/" className="btn-ghost"><Home size={15} /> Ver sitio</Link>
          <button className="btn-ghost" onClick={logout}><LogOut size={15} /> Salir</button>
        </div>
      </header>

      <section className="card">
        <div className="timeline__head">
          <h3>Experiencias laborales</h3>
          <button className="btn-download" onClick={() => setEditing({})}><Plus size={16} /> Nueva</button>
        </div>
        {error && <p className="alert error" role="alert">{error} <button className="link-btn" onClick={load}>Reintentar</button></p>}
        {loading ? <p className="muted">Cargando…</p> : items.length === 0 && !error ? (
          <p className="muted">Aún no hay experiencias. Crea la primera con “Nueva”.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Persona</th><th>Cargo</th><th>Empresa</th><th>Período</th><th className="right">Acciones</th></tr></thead>
              <tbody>
                {items.map((x) => (
                  <tr key={x._id}>
                    <td data-label="Persona">{getPersona(x.persona || PERSONAS[0].slug)?.nombre}</td>
                    <td data-label="Cargo"><b>{x.cargo}</b></td>
                    <td data-label="Empresa">{x.empresa}</td>
                    <td data-label="Período">{x.periodo}</td>
                    <td className="right">
                      <button className="icon-action" title="Editar" aria-label={`Editar ${x.cargo}`} onClick={() => setEditing(x)}><Pencil size={17} /></button>
                      <button className="icon-action danger" title="Eliminar" aria-label={`Eliminar ${x.cargo}`} onClick={() => setToDelete(x)}><Trash2 size={17} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editing && (
        <div className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.target === e.currentTarget && setEditing(null)}>
          <div className="modal__box card">
            <button className="modal__close" aria-label="Cerrar" onClick={() => setEditing(null)}><X size={20} /></button>
            <ExperienceForm initial={editing} onSubmit={save} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}

      {toDelete && (
        <div className="modal" role="alertdialog" aria-modal="true">
          <div className="modal__box card small">
            <h3>¿Eliminar experiencia?</h3>
            <p className="muted">“{toDelete.cargo}” en {toDelete.empresa}. Esta acción no se puede deshacer.</p>
            <div className="form-actions">
              <button className="btn-ghost" onClick={() => setToDelete(null)}>Cancelar</button>
              <button className="btn-download btn-danger" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
