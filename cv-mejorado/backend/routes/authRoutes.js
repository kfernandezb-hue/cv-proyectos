const router = require('express').Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const requireAuth = require('../middleware/auth');

// Máximo 10 intentos de login cada 15 minutos por IP (frena fuerza bruta)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' }
});

// Comparación en tiempo constante
const safeEqual = (a, b) => {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

router.post('/login', loginLimiter, (req, res) => {
  const { usuario, password } = req.body || {};
  const okUser = safeEqual(usuario ?? '', process.env.ADMIN_USER);
  const okPass = safeEqual(password ?? '', process.env.ADMIN_PASSWORD);
  if (!(okUser && okPass)) return res.status(401).json({ error: 'Credenciales incorrectas' });

  const token = jwt.sign({ role: 'admin', usuario: process.env.ADMIN_USER }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '2h'
  });
  res.json({ token });
});

// Permite al frontend comprobar si su token sigue siendo válido
router.get('/me', requireAuth, (req, res) => res.json({ usuario: req.user.usuario }));

module.exports = router;
