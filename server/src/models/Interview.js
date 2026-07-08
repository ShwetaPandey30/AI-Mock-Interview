const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    techStack: {
      type: [String],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    numberOfQuestions: {
      type: Number,
      default: 10,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    startedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);