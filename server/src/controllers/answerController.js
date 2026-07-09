const Answer = require("../models/Answer");
const Question = require("../models/Question");
const { evaluateAnswer } = require("../services/geminiService");

const submitAnswer = async (req, res) => {
  try {
    const {
      interviewId,
      questionId,
      answer,
      timeTaken,
    } = req.body;

    const userId = req.user.id;

    // Find the original question
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Get AI evaluation
    const aiResponse = await evaluateAnswer(
      question.question,
      question.expectedAnswer,
      answer
    );

    // Clean Gemini response
    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanedResponse);

    // Save answer with AI score and feedback
    const savedAnswer = await Answer.create({
      interviewId,
      questionId,
      userId,
      answer,
      timeTaken,
      aiScore: result.score,
      aiFeedback: result.feedback,
    });

    res.status(201).json({
      success: true,
      message: "Answer evaluated successfully",
      answer: savedAnswer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  submitAnswer,
};