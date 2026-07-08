const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },

    communication: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    technicalKnowledge: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    confidence: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    overallFeedback: {
      type: String,
      default: "",
    },

    overallScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);