const mongoose = require("mongoose");

// Define option schema for each option in a question
const optionSchema = new mongoose.Schema({
  option_id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated ID for each option
  value: { type: String, required: false }, // Option text
});

// Define question schema for each question in a quiz
const questionSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated ID for each question
  question: { type: String, required: true }, // The question text
  options: [optionSchema], // Array of options
  correctAnswer: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the correct option's `option_id`
    required: true,
    // select: false, // Exclude from selection by default
  },
});

// Define the overall quiz schema
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [questionSchema], // Array of questions
});

// Add a `toJSON` transformation to rename `_id` to `quiz_id` and omit `_id` in options and questions
quizSchema.set("toJSON", {
  transform: (doc, ret) => {
    // Rename _id to quiz_id for the quiz
    ret.quiz_id = ret._id;
    delete ret._id; // Remove the original _id for the quiz

    // Don't delete the question_id, but remove _id if needed
    ret.questions.forEach((question) => {
      // Ensure we don't delete the question_id, only _id
      if (question._id) delete question._id; // This is safe, since _id is not being used for questions
      // question_id remains intact and should be passed to the frontend

      // Also remove option `_id` as they are redundant
      question.options.forEach((option) => {
        // ret.option_id = option._id;
        if (option._id) {
          option.option_id = option._id;
          delete option._id; // Remove the original _id
        }
      });
    });

    return ret;
  },
});

// Create the Quiz model
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = { Quiz };
