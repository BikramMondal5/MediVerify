const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure storage for medication images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5000000 }, // 5MB max file size
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only (JPG, PNG, WEBP)');
    }
  }
});

// Verify medication (upload image for analysis)
router.post('/verify', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }
    
    // Mock AI verification process
    // In a real implementation, this would call an AI service
    const verificationResult = {
      isAuthentic: Math.random() > 0.2, // 80% chance of being authentic for demo
      confidence: Math.floor(Math.random() * 30) + 70, // 70-99% confidence
      timestamp: new Date(),
      imageUrl: `/uploads/${req.file.filename}`
    };

    // Save verification result
    const medication = new Medication({
      userId: req.userId,
      verificationResult,
      metadata: req.body.metadata || {}
    });

    await medication.save();
    
    res.status(201).json(verificationResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get verification history for user
router.get('/history', auth, async (req, res) => {
  try {
    const medications = await Medication.find({ userId: req.userId })
      .sort({ 'verificationResult.timestamp': -1 });
    
    res.json(medications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get medication details by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    // Check if medication belongs to user
    if (medication.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(medication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;