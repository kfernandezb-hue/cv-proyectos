import { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { api } from '../api';

const reglas = {
  nombre: (v) => (v.trim().length >= 3 ? '' : 'Ingresa tu nombre (mínimo 3 caracteres).'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Ingresa un correo válido.'),
  telefono: (v) => (v.trim() === '' || /^[0-9+\s()-]{7,20}$/.test(v.trim()) ? '' : 'Teléfono no válido.'),
  mensaje: (v) => (v.trim().length >= 10 ? '' : 'Cuéntame un poco más (mínimo 10 caracteres).'),
};
const INICIAL = { nombre: '', email: '', telefono: '', mensaje: '' };

export default function Contacto({ persona }) {
  const [f, setF] = useState(INICIAL);
  const [touched, setTouched] = useState({});
  const [estado, setEstado] = useState(null); // {tipo, texto}
  const [busy, setBusy] = useState(false);

  const errores = Object.fromEntries(Object.keys(reglas).map((k) => [k, reglas[k](f[k])]));
  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });
  const blur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ nombre: true, email: true, telefono: true, mensaje: true });
    if (Object.values(errores).some(Boolean)) {
      return setEstado({ tipo: 'error', texto: 'Revisa los campos marcados antes de enviar.' });
    }
    setBusy(true);
    try {
      await api.post('/contacto', { ...f, mensaje: `[Para: ${persona.nombre}] ${f.mensaje}` });
      setEstado({ tipo: 'ok', texto: `¡Gracias, ${f.nombre.trim().split(' ')[0]}! Recibí tu mensaje y te responderé pronto.` });
      setF(INICIAL); setTouched({});
    } catch {
      setEstado({ tipo: 'error', texto: `No se pudo enviar ahora. Escríbeme directamente a ${persona.email}.` });
    } finally { setBusy(false); }
  };

  const campo = (name, label, el = 'input', extra = {}) => {
    const Tag = el;
    const bad = touched[name] && errores[name];
    return (
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <Tag id={name} name={name} value={f[name]} onChange={change} onBlur={blur}
             className={bad ? 'invalid' : touched[name] && f[name] ? 'valid' : ''} {...extra} />
        {bad && <small className="error">{errores[name]}</small>}
      </div>
    );
  };

  return (
    <section id="contacto" className="card reveal">
      <h3><Mail size={22} /> Contacto</h3>
      <p className="muted">Si tienes un proyecto, propuesta o necesitas una web profesional, escríbeme.</p>
      <div className="contact-grid">
        <form onSubmit={submit} noValidate>
          {campo('nombre', 'Nombre', 'input', { type: 'text', placeholder: 'Tu nombre', autoComplete: 'name' })}
          {campo('email', 'Email', 'input', { type: 'email', placeholder: 'tuemail@gmail.com', autoComplete: 'email' })}
          {campo('telefono', 'Teléfono (opcional)', 'input', { type: 'tel', placeholder: '+57 3xx xxx xxxx' })}
          {campo('mensaje', 'Mensaje', 'textarea', { rows: 5, placeholder: 'Cuéntame sobre tu proyecto…' })}
          <button className="btn-download" disabled={busy}><Send size={16} /> {busy ? 'Enviando…' : 'Enviar mensaje'}</button>
          {estado && <p className={`alert ${estado.tipo}`} role="status">{estado.texto}</p>}
        </form>
        <ul className="contact-info">
          <li><Mail size={18} /> <a href={`mailto:${persona.email}`}>{persona.email}</a></li>
          <li><Phone size={18} /> <a href={`tel:${persona.telefono.replace(/\s/g, '')}`}>{persona.telefono}</a></li>
          <li><a href={persona.linkedin} target="_blank" rel="noopener noreferrer">Perfil en LinkedIn ↗</a></li>
        </ul>
      </div>
    </section>
  );
}
