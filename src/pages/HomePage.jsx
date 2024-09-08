import React from "react";
import CursorEffect from "./CursorEffect";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen-64 relative">
      <div className="h-screen-64 bg-[#333333] flex flex-col justify-center items-center relative">
        <CursorEffect />
        <div className="relative z-10 text-white md:text-[56px] text-[30px] font-bold text-center drop-shadow-[0_0_5px_#ffffff,0_0_20px_#000,0_0_30px_#000]">
          Empowering Learners with <br />
          Quiz Experiences
        </div>
        <div className="relative z-10 text-center text-white mt-4">
          Welcome to our quiz platform, designed to enhance learning and test your knowledge across various <br />
          subjects. Explore engaging quizzes and unlock new opportunities to <br /> challenge and expand your skills!
        </div>
        <div className="flex md:flex-col flex-col md:justify-center gap-3 space-y-4 md:space-y-2 mt-5">
          <Button
            variant="contained"
            color="primary"
            startIcon={<QuizIcon />}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white"
            onClick={() => navigate(`/register`)}
          >
            Create Quiz
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LeaderboardIcon />}
            className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
            onClick={() => navigate(`/quizzes`)}
          >
            View Quizzes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
