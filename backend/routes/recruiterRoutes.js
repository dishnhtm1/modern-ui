const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { recruiterOnly } = require('../middleware/roleMiddleware');
const CandidateUpload = require('../models/CandidateUpload');
const Feedback = require('../models/Feedback');
const Job = require('../models/Job');
const User = require('../models/User');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const path = require('path');

// ✅ GET all uploads - For recruiter dashboard
router.get('/uploads', protect, recruiterOnly, async (req, res) => {
  try {
    const uploads = await CandidateUpload.find().populate('user', 'email').populate('clientId', 'email name');

    res.json(uploads);
  } catch (err) {
    console.error("❌ Error fetching uploads:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/analyze-summary', protect, recruiterOnly, async (req, res) => {
  try {
    const { cvPath, linkedinText = '', jobTitle = 'General Role' } = req.body;

    if (!cvPath) {
      return res.status(400).json({ message: "cvPath is required" });
    }

    const filePath = path.join(__dirname, '..', cvPath); // Adjust based on your project structure
    const buffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(buffer);
    const cvText = pdfData.text;

    const prompt = `
Analyze the following candidate's resume and LinkedIn summary.
Give summary, skills, and job-fit score out of 100.

Resume:
${cvText}

LinkedIn:
${linkedinText}
`;

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const output = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No AI response";
    const score = parseInt(output.match(/\\b(\\d{2,3})\\b/)?.[1] || "75");

    res.json({ summary: output, matchScore: score });
  } catch (err) {
    console.error("❌ AI summary error:", err);
    res.status(500).json({ message: "Failed to analyze resume" });
  }
});

// ✅ Bulk analyze top N candidates from a client
router.post('/analyze-top-candidates', protect, recruiterOnly, async (req, res) => {
  const { clientId, topN } = req.body;
  if (!clientId || !topN) return res.status(400).json({ message: "clientId and topN are required" });

  try {
    const uploads = await CandidateUpload.find({ clientId }).populate("user", "email");
    const results = [];

    for (const item of uploads) {
      const filePath = path.join(__dirname, "..", item.cv);
      const buffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(buffer);
      const cvText = pdfData.text;
      const linkedinText = item.linkedin || "";

      const job = await Job.findOne({ _id: item.jobId }); // if you store jobId in CandidateUpload

      const prompt = `
Analyze the following candidate's resume and LinkedIn content.
Give a short summary and job-fit score (0-100).

Resume:
${cvText}

LinkedIn:
${linkedinText}
      `;

      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
      );

      const output = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary";
      const score = parseInt(output.match(/\b(\d{2,3})\b/)?.[1] || "75");

      results.push({
        _id: item._id,
        candidateName: item.user?.email?.split("@")[0] || "Candidate",
        candidateEmail: item.user?.email,
        clientId: item.clientId,
        matchScore: score,
        summary: output,
        jobId: null,         // Optional: frontend still must select job
        jobTitle: "", 
      });
    }

    const topCandidates = results.sort((a, b) => b.matchScore - a.matchScore).slice(0, topN);
    res.json(topCandidates);
  } catch (err) {
    console.error("❌ Bulk analysis error:", err);
    res.status(500).json({ message: "Failed to analyze candidates", error: err.message });
  }
});


// ✅ Preview analysis before sending to client
router.post('/analyze-preview', protect, recruiterOnly, async (req, res) => {
  const { cvPath, linkedin } = req.body;

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyDFn6i5px_9i2XWhpz5Ojb18XB-6afdRfA`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze the following candidate:\nResume: ${cvPath}\nLinkedIn: ${linkedin}\nGive a short summary with skills and job-fit score (0-100).`
              }
            ]
          }
        ]
      }
    );

    const output = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No AI response";
    const score = parseInt(output.match(/\b(\d{2,3})\b/)?.[1] || "75");

    res.status(200).json({ summary: output, matchScore: score });

  } catch (err) {
    console.error("❌ Gemini API Error:", err?.response?.data || err.message);
    res.status(500).json({ message: "❌ AI analysis failed." });
  }
});

// ✅ Bulk save feedbacks
router.post('/save-bulk-feedback', protect, recruiterOnly, async (req, res) => {
  const { feedbacks } = req.body;

  if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
    return res.status(400).json({ message: 'No feedbacks provided' });
  }

  try {
    for (const fb of feedbacks) {
      const candidate = await User.findOne({ email: fb.candidateEmail, role: 'candidate' });
      if (!candidate) continue;

      const feedback = new Feedback({
        candidateId: candidate._id,
        candidateName: fb.candidateName,
        summary: fb.summary,
        matchScore: fb.matchScore,
        clientId: fb.clientId,
        jobId: fb.jobId,
        jobTitle: fb.jobTitle,
        reviewedBy: req.user.email
      });

      await feedback.save();
    }

    res.status(201).json({ message: '✅ All feedbacks saved successfully' });
  } catch (err) {
    console.error('❌ Bulk feedback error:', err.message);
    res.status(500).json({ message: 'Failed to save bulk feedbacks' });
  }
});


// ✅ Final submission of reviewed feedback to client
router.post('/save-feedback', protect, recruiterOnly, async (req, res) => {
  const {
    candidateEmail, // ✅ Instead of passing candidateId directly
    summary,
    matchScore,
    clientId,
    jobId,
    jobTitle,
    candidateName
  } = req.body;

  try {
    // ✅ Find candidate by email (or another unique field you store)
    const candidate = await User.findOne({ email: candidateEmail, role: 'candidate' });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const feedback = new Feedback({
      candidateId: candidate._id,
      candidateName,
      summary,
      matchScore,
      clientId,
      jobId,
      jobTitle,
      reviewedBy: req.user.email
    });

    await feedback.save();
    res.status(201).json({ message: "✅ Feedback sent to client." });

  } catch (err) {
    console.error("❌ Feedback save error:", err.message);
    res.status(500).json({ message: "❌ Failed to save feedback." });
  }
});

// ✅ Get jobs posted by a client (for recruiter dropdown)
router.get('/client-jobs/:clientId', protect, recruiterOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.clientId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

router.get('/responses', protect, recruiterOnly, async (req, res) => {
  try {
    const responses = await Feedback.find({ status: { $ne: 'pending' } });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching responses' });
  }
});

router.get('/review-feedback', protect, recruiterOnly, async (req, res) => {
  try {
    const recruiterEmail = req.user.email;
    const feedbacks = await Feedback.find({ reviewedBy: recruiterEmail });

    const enriched = await Promise.all(
      feedbacks.map(async (item) => {
        const client = await User.findById(item.clientId).select('email');
        return {
          ...item._doc,
          clientName: client?.email || 'Unknown',
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error('❌ Error fetching recruiter review feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST: Recruiter sends interview to candidate
router.post('/send-to-candidate/:id', protect, recruiterOnly, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    feedback.sentToCandidate = true;
    
    await feedback.save();

    res.status(200).json({ message: "✅ Feedback sent to candidate." });
  } catch (err) {
    console.error("❌ Send to candidate error:", err.message);
    res.status(500).json({ message: "Server error sending feedback." });
  }
});

router.post(
  '/send-final-feedback/:id',
  protect,
  authorizeRoles('recruiter'),
  async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      // Mark it as sent
      feedback.sentFinalFeedbackToCandidate = true;
      await feedback.save();

      res.status(200).json({ message: '✅ Final feedback sent to candidate.' });
    } catch (err) {
      console.error('Send final feedback error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// 🔄 Dashboard Stats (Recruiter)
router.get('/dashboard-stats', protect, recruiterOnly, async (req, res) => {
  try {
    const Job = require('../models/Job');
    const CandidateUpload = require('../models/CandidateUpload');
    const Interview = require('../models/Interview');
    const User = require('../models/User');

    const openJobs = await Job.countDocuments();
    const assignedCandidates = await CandidateUpload.countDocuments();
    const clientsCount = await User.countDocuments({ role: 'client' });

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const interviewsThisWeek = await Interview.countDocuments({
      date: { $gte: today, $lte: nextWeek },
    });

    res.json({
      openJobs,
      assignedCandidates,
      clientsCount,
      interviewsThisWeek,
    });
  } catch (err) {
    console.error("❌ Dashboard stats error:", err);
    res.status(500).json({ message: 'Dashboard stats fetch failed' });
  }
});





module.exports = router;
