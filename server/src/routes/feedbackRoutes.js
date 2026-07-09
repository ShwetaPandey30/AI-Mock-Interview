const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getInterviewFeedback,
} = require("../controllers/feedbackController");

router.get(
  "/:interviewId",
  authMiddleware,
  getInterviewFeedback
);

module.exports = router;