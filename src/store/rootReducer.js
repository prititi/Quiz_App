import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../redux/auth/counterSlice";
import authReducer from "../redux/auth/authSlice";
import quizzesReducer from "../redux/quizzes/quizSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  quiz: quizzesReducer,
});

export default rootReducer;
