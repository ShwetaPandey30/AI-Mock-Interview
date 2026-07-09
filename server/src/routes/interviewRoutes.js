const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createInterview,
  getMyInterviews,
  getInterviewById,
  deleteInterview,
} = require("../controllers/interviewController");

const router = express.Router();

// Create Interview
router.post("/create", authMiddleware, createInterview);

// Get My Interviews
router.get("/my-interviews", authMiddleware, getMyInterviews);
router.delete(
  "/:interviewId",
  authMiddleware,
  deleteInterview
);

router.get("/:id", authMiddleware, getInterviewById);
module.exports = router;