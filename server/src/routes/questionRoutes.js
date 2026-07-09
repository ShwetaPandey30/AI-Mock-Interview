const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  generateQuestions, getQuestions,
} = require("../controllers/questionController");

const router = express.Router();

router.post(
  "/generate/:interviewId",
  authMiddleware,
  generateQuestions
);
router.get(
  "/:interviewId",
  authMiddleware,
  getQuestions
);


module.exports = router;