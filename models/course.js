const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
//не все
  price: { type: Number, required: true },
  places: [
    {
      seatNumber: { type: String, required: true },
      isAvailable: { type: Boolean, required: true, default: true },
    },
  ],
});

const Flight = mongoose.model('Course', courseSchema);

module.exports = Course;