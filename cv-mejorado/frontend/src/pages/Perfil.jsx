import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { GraduationCap, FolderKanban, Rocket, Globe, Lock } from 'lucide-react';
import { api } from '../api';
import { getPersona, PROYECTOS } from '../data';
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';
import Bars from '../components/Bars';
import Experiencias from '../components/Experiencias';
import Contacto from '../components/Contacto';

export default function Perfil() {
  const { slug } = useParams();
  const persona = getPersona(slug);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (!persona) return;
    setLoading(true); setOffline(false);
    api.get('/experiencias', { params: { persona: slug } })
      .then(({ data }) => setExperiences(data.length ? data : persona.experienciaBase))
      .catch(() => { setExperiences(persona.experienciaBase); setOffline(true); })
      .finally(() => setLoading(false));
    document.title = `${persona.nombre} · ${persona.titulo}`;
    window.scrollTo(0, 0);
  }, [slug, persona]);

  if (!persona) return <Navigate to="/" replace />;

  return (
    <>
      <Navbar nombre={persona.nombre} tieneFormacion={persona.formacion.length > 0} />
      <header id="inicio" className="hero">
        <div className="hero__inner">
          <div className="hero__photo"><Avatar persona={persona} /></div>
          <div className="hero__text">
            <p className="eyebrow">Hola, soy</p>
            <h1>{persona.nombre}</h1>
            <h2>{persona.titulo}</h2>
            <p>{persona.resumen}</p>
            <div className="hero__cta">
              <a className="btn-download" href="#contacto">Hablemos</a>
              <a className="btn-ghost" href="#proyectos">Ver proyectos</a>
            </div>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <h3><Rocket size={18} /> Habilidades</h3><Bars items={persona.habilidades} />
          <h3><Globe size={18} /> Idiomas</h3><Bars items={persona.idiomas} />
          <h3>Tecnologías</h3>
          <div className="tags">{persona.tecnologias.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        </aside>

        <main>
          <Experiencias experiences={experiences} loading={loading} offline={offline} />

          {persona.formacion.length > 0 && (
            <section id="formacion" className="card reveal">
              <h3><GraduationCap size={22} /> Formación</h3>
              <div className="timeline">
                {persona.formacion.map((f) => (
                  <article key={f.titulo + f.periodo} className="timeline__item">
                    <div className="timeline__head"><h4>{f.titulo}</h4><span className="chip">{f.periodo}</span></div>
                    <p className="muted"><b>{f.lugar}</b></p><p>{f.texto}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section id="proyectos" className="card reveal">
            <h3><FolderKanban size={22} /> Proyectos</h3>
            <div className="projects">
              {PROYECTOS.map((p) => (
                <article key={p.titulo} className="project">
                  <div className="timeline__head"><h4>{p.titulo}</h4><span className="chip">{p.anio}</span></div>
                  <p>{p.texto}</p>
                  <div className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                </article>
              ))}
            </div>
          </section>

          <Contacto persona={persona} />
        </main>
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} {persona.nombre}
        <Link to="/" className="link-btn">← Equipo</Link>
        <Link to="/admin" className="link-btn" title="Panel administrador"><Lock size={14} /> Admin</Link>
      </footer>
    </>
  );
}
