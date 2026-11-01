// Carga las experiencias iniciales: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('../models/Experience');

const datos = [
  { persona: 'kevin-fernandez', cargo: 'Desarrollador Web Junior', empresa: 'TecnoWeb Solutions', periodo: '2024 - 2025',
    descripcion: 'Desarrollo y mantenimiento de sitios web con HTML, CSS y JavaScript. Creación de interfaces, corrección de errores, optimización de páginas y adaptación a distintos dispositivos.' },
  { persona: 'kevin-fernandez', cargo: 'Auxiliar de Desarrollo de Software', empresa: 'SoftCode Colombia', periodo: '2025 - 2026',
    descripcion: 'Apoyo en el desarrollo y mantenimiento de aplicaciones web, manejo de bases de datos y pruebas funcionales. Identificación y solución de errores, documentación de procesos y trabajo con el equipo de desarrollo.' },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hoja_de_vida');
  if (await Experience.countDocuments()) { console.log('La colección ya tiene datos; no se insertó nada.'); }
  else { await Experience.insertMany(datos); console.log(`✅ ${datos.length} experiencias insertadas`); }
  await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
