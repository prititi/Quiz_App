const express = require("express");
const { Quiz } = require("../models/Quiz");
const { verifyAdmin } = require("../middleware/verifyToken");
const { Submission } = require("../models/Submission.js");
const mongoose = require("mongoose");

const quizRoutes = express.Router();

const { ObjectId } = mongoose.Types;
const normalizeString = (str) => str.trim().toLowerCase();

const validateQuestions = (questions) => {
  if (questions.length < 5) return "A quiz must have at least 5 questions";

  for (const question of questions) {
    if (question.options.length < 4) return "Each question must have at least 4 options";

    const optionValues = question.options.map((option) => normalizeString(option.value));

    if (!optionValues.includes(normalizeString(question.correctAnswer))) {
      return "The correct answer must be one of the options";
    }
  }

  return null;
};

// Create quiz
quizRoutes.post("/", verifyAdmin, async (req, res) => {
  const { title, description, questions } = req.body;

  // Validate quiz questions (you should define this function)
  const validationError = validateQuestions(questions);
  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  try {
    // Process questions and options
    const processedQuestions = questions.map((question) => {
      const optionsWithIds = question.options.map((option) => ({
        ...option,
        _id: option._id || new ObjectId(), // Generate new ObjectId if none exists
      }));

      const correctAnswerValue = normalizeString(question.correctAnswer);

      // Find the correct option and set its _id as the correct answer
      const correctOption = optionsWithIds.find((option) => normalizeString(option.value) === correctAnswerValue);

      if (!correctOption) {
        throw new Error(`Correct answer "${question.correctAnswer}" not found in options`);
      }

      return {
        ...question,
        options: optionsWithIds,
        correctAnswer: correctOption._id, // Store correct answer as option's _id
      };
    });

    // Save the quiz to the database
    const quiz = new Quiz({ title, description, questions: processedQuestions });
    await quiz.save();

    res.status(201).json({ success: true, message: "Quiz created successfully" });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the quiz. Please try again later.",
    });
  }
});

// Get all quizzes
quizRoutes.get("/", async (req, res) => {
  try {
    // const quizzes = await Quiz.find().select("-questions.correctAnswer");
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).send("Error fetching quizzes");
  }
});

// Get a specific quiz by id
quizRoutes.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select("-questions.correctAnswer");
    if (!quiz) return res.status(404).send("Quiz not found");

    res.json(quiz);
  } catch (error) {
    res.status(500).send("Error fetching quiz");
  }
});

// User submit quiz
quizRoutes.post("/:id/submit", async (req, res) => {
  const { answers, userName, startTime } = req.body;

  if (!userName) return res.status(400).send("User name is required");
  if (!Array.isArray(answers) || answers.length === 0) return res.status(400).send("Answers are required");

  try {
    const quiz = await Quiz.findById(req.params.id).select("questions.correctAnswer questions.question_id");

    if (!quiz) return res.status(404).send("Quiz not found");

    let score = 0;

    const userResponses = answers.map((answer) => {
      const question = quiz.questions.find((q) => q.question_id.toString() === answer.question_id);

      if (!question) {
        throw new Error(`Question with ID ${answer.question_id} not found`);
      }

      const isCorrect = question.correctAnswer.toString() === answer.option_id.toString();

      if (isCorrect) score++;

      return {
        question_id: answer.question_id,
        option_id: answer.option_id,
        isCorrect,
      };
    });

    const timeTaken = Math.floor((Date.now() - new Date(startTime)) / 1000);

    const submission = new Submission({
      quizId: quiz._id,
      userName,
      answers: userResponses,
      score,
      percentage: (score / quiz.questions.length) * 100,
      timeTaken,
    });

    await submission.save();

    res.json({
      user_name: userName,
      score,
      percentage: (score / quiz.questions.length) * 100,
      timeTaken,
      responses: userResponses,
    });
  } catch (error) {
    console.error("Error during submission:", error);
    res.status(500).send("Error submitting quiz");
  }
});

// Get all user submissions
quizRoutes.get("/:id/submissions", async (req, res) => {
  try {
    const quizId = new ObjectId(req.params.id);
    const submissions = await Submission.find({ quizId }).select("-_id -answers._id").lean();

    if (!submissions || submissions.length === 0) {
      return res.status(404).send("No submissions found for this quiz");
    }

    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).send("Error fetching submissions");
  }
});

// Update a quiz by ID
quizRoutes.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !description || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, description, and questions",
      });
    }

    const validationError = validateQuestions(questions);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Process questions for correctAnswer IDs
    const processedQuestions = questions.map((question) => {
      const optionsWithIds = question.options.map((option) => ({
        ...option,
        _id: option._id || new ObjectId(),
      }));

      const correctAnswerValue = normalizeString(question.correctAnswer);

      const correctOption = optionsWithIds.find((option) => normalizeString(option.value) === correctAnswerValue);

      if (!correctOption) {
        throw new Error(`Correct answer "${question.correctAnswer}" not found in options`);
      }

      return {
        ...question,
        options: optionsWithIds,
        correctAnswer: correctOption._id,
      };
    });

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        questions: processedQuestions,
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.json({
      success: true,
      message: "Quiz updated successfully",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error("Error updating quiz:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the quiz",
    });
  }
});

// Delete a quiz
quizRoutes.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.send("Quiz deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting quiz");
  }
});

module.exports = { quizRoutes };
