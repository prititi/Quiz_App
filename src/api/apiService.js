// src/api/apiService.js
import axios from "axios";

const BASE_URL = "https://dummy-q-server.onrender.com/api";

export const fetchAllQuizzes = () => axios.get(`${BASE_URL}/quizzes`);

export const fetchQuizById = (quizId) => axios.get(`${BASE_URL}/quizzes/${quizId}`);

export const submitQuizAnswers = (quizId, payload) =>
  axios.post(`${BASE_URL}/quizzes/${quizId}/submit`, payload, {
    headers: { "Content-Type": "application/json" },
  });

export const createQuizService = (quizData, token) => {
  console.log({quizData})
  axios.post(`${BASE_URL}/quizzes/`, quizData, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
};

export const updateQuizService = (id, quizData, token) => {
  console.log({ quizData });
  axios.put(`${BASE_URL}/quizzes/${id}`, quizData, {
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
};
