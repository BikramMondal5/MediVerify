const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verificationResult: {
    isAuthentic: Boolean,
    confidence: Number,
    timestamp: Date,
    imageUrl: String
  },
  metadata: {
    medicationName: String,
    manufacturer: String,
    batchNumber: String,
    expiryDate: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Medication', MedicationSchema);