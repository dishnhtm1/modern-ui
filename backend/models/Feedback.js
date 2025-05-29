const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  candidateId: { type: String, required: true },
  candidateName: { type: String },
  clientId: { type: String, required: true },
  jobTitle: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  summary: { type: String, required: true },
  matchScore: { type: Number },
  reviewedBy: { type: String },
  additionalFeedback: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  interviewDate: { type: Date },
  interviewType: { type: String },
  sentToCandidate: { type: Boolean, default: false },
  finalDecision: { type: String, enum: ['confirmed', 'rejected', ''], default: '' },
  createdAt: { type: Date, default: Date.now },
  finalMessage: { type: String, default: "" },
  sentToCandidate: { type: Boolean, default: false },
  sentFinalFeedbackToCandidate: { type: Boolean, default: false }


  
});

module.exports = mongoose.model('Feedback', feedbackSchema);