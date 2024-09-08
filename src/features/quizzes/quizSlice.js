import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch quiz data
export const fetchQuizData = createAsyncThunk("quiz/fetchQuizData", async (quizId) => {
  const response = await axios.get(`https://dummy-q-server.onrender.com/api/quizzes/${quizId}`);
  return response.data;
});

// Async thunk to submit quiz answers
export const submitQuiz = createAsyncThunk("quiz/submitQuiz", async ({ quizId, payload }) => {
  const response = await axios.post(`https://dummy-q-server.onrender.com/api/quizzes/${quizId}/submit`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizData: {},
    result: {},
    status: "idle",
    error: null,
  },
  reducers: {
    clearResult: (state) => {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizData = action.payload;
      })
      .addCase(fetchQuizData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(submitQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearResult } = quizSlice.actions;

export default quizSlice.reducer;
