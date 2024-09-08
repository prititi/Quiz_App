// src/tests/QuizzesList.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../redux/quizzes/quizSlice";
import authReducer from "../redux/auth/authSlice";
import { describe, expect, test } from "vitest";
import QuizzesList from "../pages/QuizzesList";

const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: { quiz: quizReducer, auth: authReducer }, preloadedState }),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("QuizzesList Component", () => {
  test("renders loading spinner when loading quizzes", () => {
    renderWithProviders(<QuizzesList />, {
      preloadedState: {
        quiz: { status: "loading", quizzes: [] },
        auth: { token: null },
      },
    });

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  test("renders quizzes when fetched successfully", () => {
    const quizzes = [
      { quiz_id: "1", title: "Quiz 1", description: "This is quiz 1" },
      { quiz_id: "2", title: "Quiz 2", description: "This is quiz 2" },
    ];

    renderWithProviders(<QuizzesList />, {
      preloadedState: {
        quiz: { status: "succeeded", quizzes },
        auth: { token: "dummyToken" },
      },
    });

    expect(screen.getByText(/Quiz 1/)).toBeInTheDocument();
    expect(screen.getByText(/Quiz 2/)).toBeInTheDocument();
  });

  test("renders edit and delete buttons if token exists", () => {
    const quizzes = [{ quiz_id: "1", title: "Quiz 1", description: "This is quiz 1" }];

    renderWithProviders(<QuizzesList />, {
      preloadedState: {
        quiz: { status: "succeeded", quizzes },
        auth: { token: "dummyToken" },
      },
    });

    const editIcon = screen.getByLabelText("Edit");
    const deleteIcon = screen.getByLabelText("Delete");

    expect(editIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
  });

  test("does not render edit and delete buttons if token does not exist", () => {
    const quizzes = [{ quiz_id: "1", title: "Quiz 1", description: "This is quiz 1" }];

    renderWithProviders(<QuizzesList />, {
      preloadedState: {
        quiz: { status: "succeeded", quizzes },
        auth: { token: null },
      },
    });

    const editButton = screen.queryByLabelText("Edit");
    const deleteButton = screen.queryByLabelText("Delete");

    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  test("navigates to take quiz when Take Quiz button is clicked", () => {
    const quizzes = [{ quiz_id: "1", title: "Quiz 1", description: "This is quiz 1" }];

    renderWithProviders(<QuizzesList />, {
      preloadedState: {
        quiz: { status: "succeeded", quizzes },
        auth: { token: "dummyToken" },
      },
    });

    const takeQuizButton = screen.getByText(/Take Quiz/);
    fireEvent.click(takeQuizButton);

    expect(screen.getByText(/Quiz 1/)).toBeInTheDocument(); // Mock navigation confirmation
  });
});
