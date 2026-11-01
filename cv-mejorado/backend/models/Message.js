const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
  telefono: { type: String, trim: true, maxlength: 20, default: '' },
  mensaje: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
