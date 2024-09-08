import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/auth/counterSlice";
import authReducer from "../features/auth/authSlice";
import quizzesReducer from "../features/quizzes/quizSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  quiz: quizzesReducer,
});

export default rootReducer;
