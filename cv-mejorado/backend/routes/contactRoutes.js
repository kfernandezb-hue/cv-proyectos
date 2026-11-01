const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const Message = require('../models/Message');
const requireAuth = require('../middleware/auth');

// Anti-spam: 5 mensajes por hora por IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Has enviado demasiados mensajes. Intenta más tarde.' }
});

router.post('/', limiter, async (req, res, next) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body || {};
    await Message.create({ nombre, email, telefono, mensaje });
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});

// El admin puede leer los mensajes recibidos
router.get('/', requireAuth, async (_req, res, next) => {
  try { res.json(await Message.find().sort({ createdAt: -1 })); } catch (e) { next(e); }
});

module.exports = router;
