// src/redux/quizSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchQuizzes, fetchQuizData, submitQuiz, createQuiz, updateQuiz } from "./quizThunks";

const initialState = {
  quizzes: [],
  quizData: {},
  result: {},
  status: "idle",
  creationStatus: "idle",
  updationStatus: "idle",
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = null;
      state.quizzes = [];
      state.quizData = {};
      state.result = {};
      state.status = "idle";
      state.error = null;
      state.creationStatus= "idle";
      state.updationStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch single quiz by ID
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

      // Submit quiz answers
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
      })

      .addCase(createQuiz.pending, (state) => {
        console.log("inside createQuiz");
        state.creationStatus = "loading";
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.creationStatus = "succeeded";
        state.result = action?.payload;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.creationStatus = "failed";
        state.error = action.error.message;
      })

      .addCase(updateQuiz.pending, (state) => {
        console.log("inside createQuiz");
        state.updationStatus = "loading";
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.updationStatus = "succeeded";
        state.result = action?.payload;
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.updationStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearResult } = quizSlice.actions;

export default quizSlice.reducer;
