const Answer = require("../models/Answer");
const Question = require("../models/Question");

const getInterviewFeedback = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const answers = await Answer.find({ interviewId })
      .populate("questionId", "question");

    if (answers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No answers found for this interview",
      });
    }

    const totalScore = answers.reduce(
      (sum, answer) => sum + answer.aiScore,
      0
    );

    const averageScore = totalScore / answers.length;

    const report = answers.map((answer) => ({
      question: answer.questionId.question,
      answer: answer.answer,
      aiScore: answer.aiScore,
      aiFeedback: answer.aiFeedback,
    }));

    res.status(200).json({
      success: true,
      totalQuestions: answers.length,
      averageScore: averageScore.toFixed(2),
      report,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInterviewFeedback,
};