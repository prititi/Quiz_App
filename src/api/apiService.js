// src/api/apiService.js
import axios from "axios";

const BASE_URL = "https://dummy-q-server.onrender.com/api";

export const fetchAllQuizzes = () => axios.get(`${BASE_URL}/quizzes`);

export const fetchQuizById = (quizId) => axios.get(`${BASE_URL}/quizzes/${quizId}`);

export const submitQuizAnswers = (quizId, payload) =>
  axios.post(`${BASE_URL}/quizzes/${quizId}/submit`, payload, {
    headers: { "Content-Type": "application/json" },
  });
