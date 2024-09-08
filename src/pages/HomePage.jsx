import React from "react";
import CursorEffect from "./CursorEffect";

const HomePage = () => {
  return (
    <div className="w-full h-screen-64 relative">
      <div className="h-screen-64 bg-[#333333] flex flex-col justify-center items-center relative">
        <CursorEffect />
        <div className="relative z-10 text-white text-[56px] font-bold text-center drop-shadow-[0_0_5px_#ffffff,0_0_20px_#000,0_0_30px_#000]">
          Empowering Learners with <br /> Interactive Quiz Experiences
        </div>
        <div className="relative z-10 text-center text-white mt-4">
          Welcome to our quiz platform, designed to enhance learning and test your knowledge across various <br />
          subjects. Explore engaging quizzes and unlock new opportunities to <br /> challenge and expand your skills!
        </div>
      </div>
    </div>
  );
};

export default HomePage;
