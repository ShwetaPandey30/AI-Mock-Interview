const model = require("../services/geminiService");

const testGemini = async (req, res) => {
  try {
    const result = await model.generateContent("Say Hello from Gemini");

    res.status(200).json({
      success: true,
      response: result.response.text(),
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  testGemini,
};