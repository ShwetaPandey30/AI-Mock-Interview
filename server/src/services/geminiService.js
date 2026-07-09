const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateWithGemini = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const evaluateAnswer = async (question, expectedAnswer, userAnswer) => {

  const prompt = `
You are an experienced technical interviewer.

Question:
${question}

Expected Answer:
${expectedAnswer}

Candidate Answer:
${userAnswer}

Evaluate the candidate.

Return ONLY valid JSON in this format:

{
  "score":8,
  "feedback":"Good answer but explain Virtual DOM more clearly."
}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};
module.exports = {
  generateWithGemini,
  evaluateAnswer,
};