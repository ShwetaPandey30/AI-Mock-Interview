const Interview = require("../models/Interview");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const interviews = await Interview.find({
      createdBy: userId,
    });

    const totalInterviews = interviews.length;

    const completed = interviews.filter(
      (i) => i.status === "Completed"
    ).length;

    const pending = interviews.filter(
      (i) => i.status !== "Completed"
    ).length;

    const totalScore = interviews.reduce(
      (sum, interview) => sum + (interview.overallScore || 0),
      0
    );

    const averageScore =
      totalInterviews > 0
        ? (totalScore / totalInterviews).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      totalInterviews,
      completed,
      pending,
      averageScore,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};