const CandidateUpload = require('../models/CandidateUpload');

const uploadCandidateData = async (req, res) => {
  const { linkedin } = req.body;

  console.log("📦 REQ.FILE:", req.file);       
  console.log("🔗 LINKEDIN:", linkedin);       

  try {
    if (!req.file || !linkedin) {
      return res.status(400).json({ message: "Missing file or LinkedIn URL" });
    }

    const upload = new CandidateUpload({
      user: req.user?.id || null, 
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
