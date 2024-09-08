// src/routes/Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Register } from "./pages/Register";
import QuizzesList from "./components/QuizzesList";
import TakeQuiz from "./components/TakeQuiz";
import Leaderboard from "./components/LeaderBoard";

const MainContainer = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quizzes" element={<QuizzesList />} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Layout>
  </Router>
);

export default MainContainer;
