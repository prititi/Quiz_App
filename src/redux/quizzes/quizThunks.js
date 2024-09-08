// src/redux/quizThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllQuizzes,
  fetchQuizById,
  submitQuizAnswers,
  createQuizService,
  updateQuizService,
  deleteQuizService,
} from "../../api/apiService";

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

export const createQuiz = createAsyncThunk("quiz/createQuiz", async ({ data, token }) => {
  const response = await createQuizService(data, token);

  return "";
});

export const updateQuiz = createAsyncThunk("quiz/updateQuiz", async ({ id, data, token }) => {
  const response = await updateQuizService(id, data, token);

  return "";
});
export const deleteQuiz = createAsyncThunk("quiz/deleteQuiz", async ({ id, token }) => {
  const response = await deleteQuizService(id, token);

  return "";
});

export const deleteQuizAndFetch = (quizId) => async (dispatch) => {
  await dispatch(deleteQuiz(quizId));

  setTimeout(() => {
    dispatch(fetchQuizzes());
  }, 1000);
};
