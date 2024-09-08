// src/redux/quizThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllQuizzes, fetchQuizById, submitQuizAnswers } from "../../api/apiService";

// Fetch all quizzes
export const fetchQuizzes = createAsyncThunk("quiz/fetchQuizzes", async () => {
  const response = await fetchAllQuizzes();
  return response.data;
});

// Fetch single quiz by ID
export const fetchQuizData = createAsyncThunk("quiz/fetchQuizData", async (quizId) => {
  const response = await fetchQuizById(quizId);
  return response.data;
});

// Submit quiz answers
export const submitQuiz = createAsyncThunk("quiz/submitQuiz", async ({ quizId, payload }) => {
  const response = await submitQuizAnswers(quizId, payload);
  return response.data;
});
