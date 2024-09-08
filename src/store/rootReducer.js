import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import quizzesReducer from "../redux/quizzes/quizSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizzesReducer,
});

export default rootReducer;
