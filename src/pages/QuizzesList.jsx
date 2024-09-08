import React, { useEffect } from "react";
import { Card, CardContent, Typography, Button, CircularProgress, IconButton } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizzes } from "../redux/quizzes/quizThunks";

const QuizzesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes, status, error } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuizzes());
    }
  }, [dispatch, status]);

  const handleTakeQuiz = (quizId, quiz) => {
    console.log({ quiz });
    console.log(`Taking Quiz ID: ${quizId}`);
    navigate(`/take-quiz?id=${quizId}`, { state: { quiz } });
  };

  const handleViewLeaderboard = (quizId, quiz) => {
    navigate(`/leaderboard?id=${quizId}`, { state: { quiz } });
    console.log(`Viewing Leaderboard for Quiz ID: ${quizId}`);
  };

  const handleEditQuiz = (quiz) => {
    console.log(`Editing Quiz ID: ${quiz}`);

    navigate("/create", { state: { editMode: true, quiz } });
    // Add your edit functionality here, e.g., opening an edit form
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <Typography variant="h4" component="h1" className="text-center font-bold text-gray-800 mb-8">
        Available Quizzes
      </Typography>
      {status === "loading" && (
        <div className="min-h-[60vh] flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {quizzes?.map((quiz) => (
          <Card key={quiz.quiz_id} className="bg-white shadow-lg rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Typography variant="h5" component="div" className="font-bold text-gray-800">
                  {quiz.title}
                </Typography>
                <IconButton onClick={() => handleEditQuiz(quiz)} className="rounded-full">
                  <EditIcon />
                </IconButton>
              </div>
              <Typography variant="body2" component="p" className="text-gray-600 mb-4">
                {quiz.description}
              </Typography>
              <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-2 mt-3">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<QuizIcon />}
                  className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white"
                  onClick={() => handleTakeQuiz(quiz.quiz_id, quiz)}
                >
                  Take Quiz
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<LeaderboardIcon />}
                  className="w-full md:w-auto border-blue-500 text-blue-500 hover:bg-blue-50"
                  onClick={() => handleViewLeaderboard(quiz.quiz_id, quiz)}
                >
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizzesList;
