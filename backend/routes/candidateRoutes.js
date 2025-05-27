const express = require('express');
const router = express.Router();
const multer = require('multer');
// const { protect } = require('../middleware/authMiddleware'); // ❌ comment this out temporarily
const { uploadCandidateData } = require('../controllers/candidateController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });





router.post('/upload', upload.single('cv'), uploadCandidateData);

module.exports = router;
