const mongoose = require('mongoose');
const PERSONAS = require('../config/personas');

const ExperienceSchema = new mongoose.Schema({
  persona: { type: String, enum: PERSONAS, default: PERSONAS[0], index: true },
  empresa: { type: String, required: true, trim: true, maxlength: 120 },
  cargo: { type: String, required: true, trim: true, maxlength: 120 },
  periodo: { type: String, required: true, trim: true, maxlength: 40 },
  descripcion: { type: String, required: true, trim: true, maxlength: 1500 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
