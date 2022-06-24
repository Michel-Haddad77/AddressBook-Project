const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
  },
  rel_status: {
    type: String,
    default: "",
    min: 6,
    max: 255,
  },
  lat: {
    type: String,
    default: "",
    min: 6,
    max: 255,
  },
  long: {
    type: String,
    default: "",
    min: 6,
    max: 255,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Contact', contactSchema);