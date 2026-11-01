import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';

const LINKS = [
  ['inicio', 'Inicio'], ['experiencia', 'Experiencia'], ['formacion', 'Formación'],
  ['proyectos', 'Proyectos'], ['contacto', 'Contacto'],
];

export default function Navbar({ nombre = 'Equipo', tieneFormacion = true }) {
  const links = LINKS.filter(([id]) => tieneFormacion || id !== 'formacion');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach(([id]) => { const el = document.getElementById(id); el && obs.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); };
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__bar">
        <a href="#inicio" className="nav__brand"><img src="/img/logo.png" alt="" /> {nombre}</a>
        <button className="nav__toggle" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`nav__links ${open ? 'open' : ''}`}>
        <Link to="/" className="nav__link" onClick={() => setOpen(false)}>Equipo</Link>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={`nav__link ${active === id ? 'active' : ''}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="btn-download" href="/hoja_de_vida.pdf" download>
          <Download size={16} /> Descargar CV
        </a>
      </div>
    </nav>
  );
}
