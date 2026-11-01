import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { PERSONAS, EQUIPO } from '../data';
import Avatar from '../components/Avatar';

export default function Equipo() {
  return (
    <>
      <header className="hero hero--team">
        <div className="team-head">
          <img src="/img/logo.png" alt="" width="48" height="48" />
          <h1>{EQUIPO.titulo}</h1>
          <h2>{EQUIPO.subtitulo}</h2>
        </div>
      </header>

      <main className="team-grid">
        {PERSONAS.map((p) => (
          <article key={p.slug} className="card team-card">
            <Avatar persona={p} className="team-card__photo" />
            <h3>{p.nombre}</h3>
            <p className="muted">{p.titulo}</p>
            <p className="team-card__text">{p.resumen}</p>
            <Link to={`/perfil/${p.slug}`} className="btn-download">Ver hoja de vida <ArrowRight size={16} /></Link>
          </article>
        ))}
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {EQUIPO.titulo}
        <Link to="/admin" className="link-btn" title="Panel administrador"><Lock size={14} /> Admin</Link>
      </footer>
    </>
  );
}
