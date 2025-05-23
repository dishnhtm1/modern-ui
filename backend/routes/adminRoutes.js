const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const User = require("../models/User");

const router = express.Router();

// GET /api/admin/pending-users
router.get("/pending-users", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/admin/approve-user/:id
router.put("/approve-user/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});

module.exports = router;
