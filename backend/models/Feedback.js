const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  candidateId: { type: String, required: true },
  candidateName: { type: String },
  clientId: { type: String, required: true },
  jobTitle: { type: String },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  summary: { type: String, required: true },
  matchScore: { type: Number },

  // 🎯 For visual feedback
  skills: {
    type: Map,
    of: Number,
    default: {},
  },
  positives: {
    type: [String],
    default: [],
  },
  negatives: {
    type: [String],
    default: [],
  },
  recommendations: {
    type: [String],
    default: [],
  },

  reviewedBy: { type: String },
  additionalFeedback: { type: String },

  // 🗓️ Status & Interview
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  interviewDate: { type: Date },
  interviewType: { type: String },

  // ✅ Final decision
  finalDecision: {
    type: String,
    enum: ['confirmed', 'rejected', ''],
    default: '',
  },
  finalMessage: { type: String, default: "" },

  // 🔁 Status flags
  sentToCandidate: { type: Boolean, default: false },
  sentFinalFeedbackToCandidate: { type: Boolean, default: false },

  // 📅 Timestamps
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
