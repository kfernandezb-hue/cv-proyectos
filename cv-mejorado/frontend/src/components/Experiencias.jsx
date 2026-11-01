import { Briefcase } from 'lucide-react';

export default function Experiencias({ experiences, loading, offline }) {
  return (
    <section id="experiencia" className="card reveal">
      <h3><Briefcase size={22} /> Experiencia laboral</h3>
      {offline && <p className="notice">Mostrando datos de ejemplo: la API no está disponible.</p>}
      {loading ? <p className="muted">Cargando…</p> : experiences.length === 0 ? (
        <p className="muted">Aún no hay experiencias registradas.</p>
      ) : (
        <div className="timeline">
          {experiences.map((exp) => (
            <article key={exp._id} className="timeline__item">
              <div className="timeline__head"><h4>{exp.cargo}</h4><span className="chip">{exp.periodo}</span></div>
              <p className="muted"><b>{exp.empresa}</b></p>
              <p>{exp.descripcion}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
