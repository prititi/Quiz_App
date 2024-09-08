const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  userName: { type: String, required: true },
  answers: [
    {
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question",  },
      option_id: { type: mongoose.Schema.Types.ObjectId, ref: "Option",  },
    },
  ],
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = { Submission };
