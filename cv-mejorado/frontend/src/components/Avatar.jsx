// Foto de la persona o, si aún no tiene, un círculo con sus iniciales
export default function Avatar({ persona, className = '' }) {
  return persona.foto
    ? <img
        className={className}
        style={persona.fotoPos ? { objectPosition: persona.fotoPos } : undefined}
        src={persona.foto}
        alt={`Foto de ${persona.nombre}`}
      />
    : <div
        className={`avatar-ph ${className}`}
        role="img"
        aria-label={`Foto de ${persona.nombre} (pendiente)`}
      >
        {persona.iniciales}
      </div>;
}
