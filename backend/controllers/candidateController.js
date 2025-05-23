const CandidateUpload = require('../models/CandidateUpload');

const uploadCandidateData = async (req, res) => {
  const { linkedin } = req.body;

  try {
    const upload = new CandidateUpload({
      user: req.user.id,
      cv: req.file.path,
      linkedin
    });
    await upload.save();
    res.status(201).json({ message: 'Uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

module.exports = { uploadCandidateData };  // ✅ correct export
