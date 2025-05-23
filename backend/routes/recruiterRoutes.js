const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { recruiterOnly } = require('../middleware/roleMiddleware');
const CandidateUpload = require('../models/CandidateUpload');

// @route   GET /api/recruiter/uploads
// @desc    Get all candidate uploads for recruiter view
// @access  Private (Recruiter only)
router.get('/uploads', protect, recruiterOnly, async (req, res) => {
  try {
    const uploads = await CandidateUpload.find().populate('user', 'email');
    res.json(uploads);
  } catch (err) {
    console.error("Error fetching uploads:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
