//  EQUIPO. Los datos de Andrés y Maira son PROVISIONALES (marcados TODO):
//  reemplaza título, resumen, contacto, habilidades e idiomas por los reales.
// =====================================================================
const HAB_BASE = [
  { nombre: 'Trabajo en equipo', nivel: 85 },
  { nombre: 'Resolución de problemas', nivel: 75 },
  { nombre: 'Aprendizaje continuo', nivel: 80 },
];
 
export const PERSONAS = [
  {
    slug: 'kevin-fernandez',
    nombre: 'Kevin Fernández',
    iniciales: 'KF',
    foto: '/img/foto_kevin.jpeg',
    fotoPos: '75% 30%',
    titulo: 'Ingeniero de Software y Diseñador Web',
    resumen: 'Ingeniero de Software con formación en programación, desarrollo web y bases de datos. Responsable, creativo y comprometido, busco aportar a un equipo de desarrollo web mientras sigo fortaleciendo mis habilidades y asumiendo nuevos retos.',
    email: 'correo@gmail.com', telefono: '+57 3124876584', linkedin: 'https://www.linkedin.com',
    habilidades: [
      { nombre: 'Trabajo en equipo', nivel: 90 },
      { nombre: 'Gestión de proyectos', nivel: 75 },
      { nombre: 'Liderazgo', nivel: 75 },
    ],
    idiomas: [
      { nombre: 'Español', nivel: 100, etiqueta: 'Nativo' },
      { nombre: 'Inglés', nivel: 60, etiqueta: 'Intermedio' },
      { nombre: 'Francés', nivel: 35, etiqueta: 'Básico' },
    ],
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL', 'Responsive Design'],
    experienciaBase: [
      { _id: 'base-2', cargo: 'Auxiliar de Desarrollo de Software', empresa: 'SoftCode Colombia', periodo: '2025 - 2026',
        descripcion: 'Apoyo en el desarrollo y mantenimiento de aplicaciones web, manejo de bases de datos y pruebas funcionales. Identificación y solución de errores, documentación de procesos y trabajo con el equipo de desarrollo.' },
      { _id: 'base-1', cargo: 'Desarrollador Web Junior', empresa: 'TecnoWeb Solutions', periodo: '2024 - 2025',
        descripcion: 'Desarrollo y mantenimiento de sitios web con HTML, CSS y JavaScript. Creación de interfaces, corrección de errores, optimización de páginas y adaptación a distintos dispositivos.' },
    ],
    formacion: [
      { titulo: 'Ingeniería de Software', lugar: 'Universidad de Cartagena', periodo: '2025 - 2026',
        texto: 'Análisis, diseño, desarrollo y mantenimiento de software: programación, bases de datos, desarrollo web, algoritmos, estructuras de datos y metodologías de proyecto.' },
      { titulo: 'Desarrollo Web', lugar: 'SENA', periodo: '2012 - 2014',
        texto: 'Estructura, diseño y funcionamiento de sitios y aplicaciones web; interfaces organizadas, funcionales y adaptables a distintos dispositivos.' },
      { titulo: 'Programación y Desarrollo de Software', lugar: 'SENA', periodo: '2012 - 2014',
        texto: 'Análisis de requerimientos, algoritmos y fundamentos de programación; fortalecimiento del pensamiento lógico y la resolución de problemas.' },
    ],
  },
  {
    slug: 'andres-acevedo',
    nombre: 'Andrés Acevedo',
    iniciales: 'AA',
    foto: '/img/andres.jpeg',
    fotoPos: '50% 25%',
    titulo: 'Ingeniero de Software', // TODO
    resumen: 'Ingeniero de Software con habilidades en desarrollo tecnológico, lógica de programación y gestión de bases de datos. Me destaco por mi pensamiento analítico, iniciativa, adaptabilidad y disposición para asumir nuevos desafíos. Tengo como propósito contribuir al crecimiento de las organizaciones mediante soluciones innovadoras, eficientes y de calidad, fortaleciendo continuamente mis conocimientos y experiencia profesional.',
    email: 'aacevedoc@unicartagena.edu.com', telefono: '+57 3255145245', linkedin: 'https://www.linkedin.com', // TODO
    habilidades: HAB_BASE, // TODO
    idiomas: [{ nombre: 'Español', nivel: 100, etiqueta: 'Nativo' }], // TODO
    tecnologias: ['HTML', 'CSS', 'JavaScript'], // TODO
  
    experienciaBase: [
    {
      _id: 'base-2',
    cargo: 'Analista de Sistemas Junior',
    empresa: 'Innovatech Solutions',
    periodo: '2025 - 2026',
    descripcion: 'Análisis de requerimientos, apoyo en el diseño de sistemas informáticos y gestión de bases de datos. Elaboración de documentación técnica, detección de errores y colaboración en la implementación de soluciones tecnológicas.'
    }
    ] ,
    
   
    
  
     formacion: [
      { titulo: 'Ingeniería de Software', lugar: 'Universidad de Cartagena', periodo: '2025 - 2026',
        texto: 'Análisis, diseño, desarrollo y mantenimiento de software: programación, bases de datos, desarrollo web, algoritmos, estructuras de datos y metodologías de proyecto.' },
      { titulo: 'Desarrollo Web', lugar: 'SENA', periodo: '2012 - 2014',
        texto: 'Estructura, diseño y funcionamiento de sitios y aplicaciones web; interfaces organizadas, funcionales y adaptables a distintos dispositivos.' },
      { titulo: 'Programación y Desarrollo de Software', lugar: 'SENA', periodo: '2012 - 2014',
        texto: 'Análisis de requerimientos, algoritmos y fundamentos de programación; fortalecimiento del pensamiento lógico y la resolución de problemas.' },
    ], // TODO: { titulo, lugar, periodo, texto }
  },
  {
    slug: 'maira-llamas',
    nombre: 'Maira Llamas',
    iniciales: 'ML',
    foto: '/img/maira.jpeg',
    fotoPos: '50% 30%',
    titulo: 'Ingeniera de Software', // TODO
    resumen: 'Ingeniera de Software, con conocimientos en programación, desarrollo de aplicaciones, bases de datos y análisis de sistemas. Me caracterizo por ser una persona responsable, organizada, comprometida y con capacidad para trabajar en equipo, resolver problemas y aprender nuevas tecnologías. Busco aportar mis conocimientos al desarrollo de soluciones tecnológicas y continuar creciendo profesionalmente..',
    email: 'mllamas@aunicartagena.edu.com', telefono: '+57 3281441451', linkedin: 'https://www.linkedin.com', 
    habilidades: HAB_BASE, // TODO
    idiomas: [{ nombre: 'Español', nivel: 100, etiqueta: 'Nativo' }], // TODO
    tecnologias: ['HTML', 'CSS', 'JavaScript'], // TODO
    experienciaBase: [
      {
        _id: 'base-1',
    cargo: 'Desarrollador de Aplicaciones Junior',
    empresa: 'Digital Software Colombia',
    periodo: '2024 - 2025',
    descripcion: 'Participación en el desarrollo de aplicaciones y módulos de software, implementación de funcionalidades, mantenimiento de sistemas y ejecución de pruebas. Apoyo en la optimización del código y cumplimiento de los requerimientos de los proyectos.'
      }
    ],
     formacion: [
      { titulo: 'Ingeniería de Software', lugar: 'Universidad de Cartagena', periodo: '2025 - 2026',
        texto: 'Análisis, diseño, desarrollo y mantenimiento de software: programación, bases de datos, desarrollo web, algoritmos, estructuras de datos y metodologías de proyecto.' },
      { titulo: 'Desarrollo Web', lugar: 'SENA', periodo: '2012 - 2014',
        texto: 'Estructura, diseño y funcionamiento de sitios y aplicaciones web; interfaces organizadas, funcionales y adaptables a distintos dispositivos.' },
      { titulo: 'Programación y Desarrollo de Software', lugar: 'SENA', periodo: '2012 - 2014',
        texto: 'Análisis de requerimientos, algoritmos y fundamentos de programación; fortalecimiento del pensamiento lógico y la resolución de problemas.' },
    ], // TODO: { titulo, lugar, periodo, texto }
  },
];
 
export const getPersona = (slug) => PERSONAS.find((p) => p.slug === slug);
 
export const EQUIPO = {
  titulo: 'Equipo de desarrollo',
  subtitulo: 'Hojas de vida de Kevin Fernández, Andrés Acevedo y Maira Llamas',
};
 
// Proyectos realizados por el equipo
export const PROYECTOS = [
  { titulo: 'Sistema de Gestión de Ventas', anio: '2026', tags: ['SQL', 'Bases de datos'],
    texto: 'Sistema para administrar clientes, productos y ventas, con diseño de entidades y relaciones, y consultas SQL para registrar, consultar y actualizar información.' },
  { titulo: 'Hoja de Vida Web (este sitio)', anio: '2026', tags: ['React', 'Node.js', 'MongoDB'],
    texto: 'Sitio personal full stack: interfaz en React, API REST con Express y experiencias guardadas en MongoDB, con diseño responsive.' },
  { titulo: 'Aplicaciones y Ejercicios de Programación', anio: '2025', tags: ['Algoritmos', 'Lógica'],
    texto: 'Programas con variables, condicionales, ciclos, arreglos y matrices, enfocados en búsqueda, modificación y organización de datos.' },
];