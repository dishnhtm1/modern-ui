const mongoose = require('mongoose');

const candidateUploadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },

  cv: { type: String, required: true },
  linkedin: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CandidateUpload', candidateUploadSchema);
