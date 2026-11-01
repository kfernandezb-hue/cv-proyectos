import { useState } from 'react';
import { PERSONAS } from '../data';

const VACIO = { persona: PERSONAS[0].slug, empresa: '', cargo: '', periodo: '', descripcion: '' };

// Sirve para crear (initial vacío) y para editar (initial con datos)
export default function ExperienceForm({ initial, onSubmit, onCancel }) {
  const [f, setF] = useState({ ...VACIO, ...initial, persona: initial?.persona || VACIO.persona });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const editando = !!initial?._id;
  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try { await onSubmit({ persona: f.persona, empresa: f.empresa, cargo: f.cargo, periodo: f.periodo, descripcion: f.descripcion }); }
    catch (ex) { setErr(ex.message); setBusy(false); }
  };

  return (
    <form onSubmit={submit} className="exp-form">
      <h3>{editando ? 'Editar experiencia' : 'Nueva experiencia'}</h3>
      <div className="field"><label htmlFor="persona">Persona</label>
        <select id="persona" name="persona" value={f.persona} onChange={change}>
          {PERSONAS.map((p) => <option key={p.slug} value={p.slug}>{p.nombre}</option>)}
        </select></div>
      <div className="grid-2">
        <div className="field"><label htmlFor="cargo">Cargo</label>
          <input id="cargo" name="cargo" value={f.cargo} onChange={change} required maxLength={120} /></div>
        <div className="field"><label htmlFor="empresa">Empresa</label>
          <input id="empresa" name="empresa" value={f.empresa} onChange={change} required maxLength={120} /></div>
      </div>
      <div className="field"><label htmlFor="periodo">Período</label>
        <input id="periodo" name="periodo" placeholder="Ej: 2024 - 2025" value={f.periodo} onChange={change} required maxLength={40} /></div>
      <div className="field"><label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" name="descripcion" rows={5} value={f.descripcion} onChange={change} required maxLength={1500} />
        <small className="muted">{f.descripcion.length}/1500</small></div>
      {err && <p className="alert error" role="alert">{err}</p>}
      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={busy}>Cancelar</button>
        <button className="btn-download" disabled={busy}>{busy ? 'Guardando…' : editando ? 'Guardar cambios' : 'Crear'}</button>
      </div>
    </form>
  );
}
