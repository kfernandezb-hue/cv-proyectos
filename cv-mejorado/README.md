# Hoja de vida – Kevin Fernández

Portal de equipo (Kevin Fernández, Andrés Acevedo y Maira Llamas): **portada del equipo**, **una hoja de vida por persona** y **panel administrador con CRUD** de experiencias laborales.

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18, Vite, React Router, Axios, lucide-react |
| Backend | Node.js, Express 4, Mongoose, JWT, Helmet, rate-limit |
| Base de datos | MongoDB |

## Estructura
```
cv-mejorado/
├── backend/
│   ├── middleware/auth.js         # verifica el JWT
│   ├── models/                    # Experience, Message
│   ├── routes/                    # auth, experiencias, contacto
│   ├── scripts/seed.js            # datos iniciales
│   └── server.js
└── frontend/
    ├── public/                    # imágenes y hoja_de_vida.pdf
    └── src/
        ├── pages/                 # Home, Login, Admin
        ├── components/            # Navbar, Experiencias, ExperienceForm, ...
        ├── context/AuthContext.jsx
        ├── api.js  data.js  index.css
```

## Requisitos
Node.js 18+ y MongoDB corriendo en local (o una URI de MongoDB Atlas).

## Puesta en marcha

**1. Backend**
```bash
cd backend
cp .env.example .env     # en Windows: copy .env.example .env
# edita .env: ADMIN_USER, ADMIN_PASSWORD y JWT_SECRET
npm install
npm run seed             # (opcional) carga experiencias iniciales
npm run dev              # http://localhost:5000
```

**2. Frontend** (otra terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

## Rutas del frontend
| Ruta | Descripción |
|------|-------------|
| `/` | Portada del equipo con las tres personas |
| `/perfil/:slug` | Hoja de vida de cada una (`kevin-fernandez`, `andres-acevedo`, `maira-llamas`) |
| `/admin/login` | Inicio de sesión del administrador |
| `/admin` | Panel protegido con el CRUD de experiencias |

## API REST
| Método | Endpoint | Acceso | Descripción |
|--------|----------|--------|-------------|
| POST | `/api/auth/login` | Público | Devuelve un token JWT |
| GET | `/api/auth/me` | Admin | Valida el token |
| GET | `/api/experiencias?persona=slug` | Público | Lista experiencias (filtra por persona) |
| GET | `/api/experiencias/:id` | Público | Una experiencia |
| POST | `/api/experiencias` | Admin | **Crear** |
| PUT | `/api/experiencias/:id` | Admin | **Actualizar** |
| DELETE | `/api/experiencias/:id` | Admin | **Eliminar** |
| POST | `/api/contacto` | Público | Guarda un mensaje (limitado a 5/hora por IP) |
| GET | `/api/contacto` | Admin | Lista mensajes recibidos |
| GET | `/api/health` | Público | Estado del servidor |

Las rutas de admin requieren el encabezado `Authorization: Bearer <token>`.

## Seguridad aplicada
- Escritura protegida con JWT (expira en 2 h por defecto).
- Límite de intentos de login (10 cada 15 min) y anti-spam en contacto.
- `helmet`, CORS restringido al frontend y validación de datos en el modelo.
- Comparación de credenciales en tiempo constante.
- El `.env` **no** se sube a Git (ya está en `.gitignore`).

## Datos de cada persona
Todo se edita en `frontend/src/data.js` (arreglo `PERSONAS`). Los campos marcados `TODO` de Andrés y Maira son provisionales. Las fotos van en `frontend/public/img/`. Las experiencias se asignan a una persona desde el panel `/admin`.

## Antes de publicar
- Coloca tu `hoja_de_vida.pdf` en `frontend/public/`.
- Edita correo, teléfono, LinkedIn, habilidades y niveles en `frontend/src/data.js`.
- Usa contraseña y `JWT_SECRET` largos y únicos.
