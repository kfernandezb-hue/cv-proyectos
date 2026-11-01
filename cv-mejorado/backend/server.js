require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// Falla rápido si falta configuración crítica
['JWT_SECRET', 'ADMIN_USER', 'ADMIN_PASSWORD'].forEach((k) => {
  if (!process.env[k]) { console.error(`❌ Falta la variable de entorno ${k} (revisa tu .env)`); process.exit(1); }
});

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()) }));
app.use(express.json({ limit: '50kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/experiencias', require('./routes/experienceRoutes'));
app.use('/api/contacto', require('./routes/contactRoutes'));

app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

app.use((err, _req, res, _next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: Object.values(err.errors).map((e) => e.message).join(', ') });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hoja_de_vida')
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));
  })
  .catch((err) => { console.error('❌ Error al conectar a MongoDB:', err.message); process.exit(1); });
