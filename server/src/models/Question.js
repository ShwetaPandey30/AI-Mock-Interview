const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    expectedAnswer: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    order: {
      type: Number,
      required: true,
    },

    generatedByAI: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);