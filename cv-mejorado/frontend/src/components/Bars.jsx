export default function Bars({ items }) {
  return (
    <ul className="bars">
      {items.map((s) => (
        <li key={s.nombre}>
          <div className="bars__top"><span>{s.nombre}</span>{s.etiqueta && <small>{s.etiqueta}</small>}</div>
          <div className="bars__track" role="progressbar" aria-valuenow={s.nivel} aria-valuemin={0} aria-valuemax={100}>
            <div className="bars__fill" style={{ width: `${s.nivel}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
