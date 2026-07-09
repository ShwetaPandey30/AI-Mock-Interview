const Interview = require("../models/Interview");
const Question = require("../models/Question");
const { generateWithGemini } = require("../services/geminiService");

const generateQuestions = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const prompt = `
Generate ${interview.numberOfQuestions} interview questions.

Job Role: ${interview.jobRole}
Experience: ${interview.experience}
Tech Stack: ${interview.techStack.join(", ")}
Difficulty: ${interview.difficulty}

Return ONLY a JSON array.

Example:

[
 {
   "question":"What is React?",
   "expectedAnswer":"React is a JavaScript library...",
   "category":"React",
   "difficulty":"Easy"
 }
]
`;

    const response = await generateWithGemini(prompt);

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanedResponse);

    const savedQuestions = await Promise.all(
      questions.map((q, index) =>
        Question.create({
          interviewId,
          question: q.question,
          expectedAnswer: q.expectedAnswer,
          category: q.category,
          difficulty: q.difficulty,
          order: index + 1,
        })
      )
    );

    res.status(201).json({
      success: true,
      count: savedQuestions.length,
      questions: savedQuestions,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getQuestions = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const questions = await Question.find({ interviewId }).sort({ order: 1 });

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found",
      });
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
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
  generateQuestions,
  getQuestions,
};