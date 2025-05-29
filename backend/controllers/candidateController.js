const CandidateUpload = require('../models/CandidateUpload');

const uploadCandidateData = async (req, res) => {
  const { linkedin } = req.body;

  try {
    if (!req.file || !linkedin) {
      return res.status(400).json({ message: "Missing file or LinkedIn URL" });
    }

    // ✅ FIX: check for req.user.id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const upload = new CandidateUpload({
      user: req.user.id,
      cv: req.file.path,
      linkedin
    });

    await upload.save();
    res.status(201).json({ message: 'Uploaded successfully' });
  } catch (err) {
    console.error("❌ Upload Save Error:", err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

module.exports = { uploadCandidateData };
