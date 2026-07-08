const Interview = require("../models/Interview");

const createInterview = async (req, res) => {
  try {
    const {
      jobRole,
      experience,
      techStack,
      difficulty,
      numberOfQuestions,
    } = req.body;

    // Validation
    if (!jobRole || !experience || !techStack) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const interview = await Interview.create({
      jobRole,
      experience,
      techStack,
      difficulty,
      numberOfQuestions,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      interview,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createInterview,
  getMyInterviews,
  getInterviewById,
};