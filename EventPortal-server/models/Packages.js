const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  durationMonths: {
    type: Number,
    required: true,
    min: 1
  },
  maxEvents: {
    type: Number,
    required: true,
    min: 1
  },
  maxEmployees: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
}, {
  timestamps: true
});

// Add text index for search functionality
packageSchema.index({ name: 'text', description: 'text' });

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;