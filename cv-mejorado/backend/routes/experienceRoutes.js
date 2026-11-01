const router = require('express').Router();
const mongoose = require('mongoose');
const Experience = require('../models/Experience');
const requireAuth = require('../middleware/auth');

const PERSONAS = require('../config/personas');
const CAMPOS = ['persona', 'empresa', 'cargo', 'periodo', 'descripcion'];
const pick = (body) => Object.fromEntries(CAMPOS.map((k) => [k, body?.[k]]));

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ error: 'ID inválido' });

// READ (público)
// ?persona=slug filtra por integrante. Los registros antiguos sin persona se asignan al primero.
router.get('/', async (req, res, next) => {
  try {
    const { persona } = req.query;
    let filtro = {};
    if (persona) {
      if (!PERSONAS.includes(persona)) return res.status(400).json({ error: 'Persona no válida' });
      filtro = persona === PERSONAS[0]
        ? { $or: [{ persona }, { persona: { $exists: false } }] }
        : { persona };
    }
    res.json(await Experience.find(filtro).sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});

router.get('/:id', validId, async (req, res, next) => {
  try {
    const exp = await Experience.findById(req.params.id);
    exp ? res.json(exp) : res.status(404).json({ error: 'Experiencia no encontrada' });
  } catch (e) { next(e); }
});

// CREATE (admin)
router.post('/', requireAuth, async (req, res, next) => {
  try { res.status(201).json(await Experience.create(pick(req.body))); } catch (e) { next(e); }
});

// UPDATE (admin)
router.put('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, pick(req.body), {
      new: true, runValidators: true
    });
    exp ? res.json(exp) : res.status(404).json({ error: 'Experiencia no encontrada' });
  } catch (e) { next(e); }
});

// DELETE (admin)
router.delete('/:id', requireAuth, validId, async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    exp ? res.json({ ok: true }) : res.status(404).json({ error: 'Experiencia no encontrada' });
  } catch (e) { next(e); }
});

module.exports = router;
