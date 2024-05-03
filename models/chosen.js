const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  places: [{ type: String, required: true },],
  language: { type: String, enum: ['english', 'german', 'spanish'], default: 'elnglish' },
  level: { type: String, enum: ['a2', 'b1', 'b2'], default: 'a2' }
});

const Place = mongoose.model('Ticket', placeSchema);

module.exports = Place;
//еще параметры