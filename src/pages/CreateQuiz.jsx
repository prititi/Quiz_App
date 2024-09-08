import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Box, Typography, Paper, Card, CardContent, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz, updateQuiz } from "../redux/quizzes/quizThunks";
import { useLocation, useNavigate } from "react-router-dom";
import { clearResult } from "../redux/quizzes/quizSlice";

const quizSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required("Question is required"),
        options: yup
          .array()
          .of(yup.object().shape({ value: yup.string().required("Option is required") }))
          .min(4, "Each question must have 4 options")
          .max(4, "Each question must have 4 options"),
        correctAnswer: yup.string().required("Correct answer is required"),
      })
    )
    .min(5, "At least 5 questions are required"),
});

const AdminQuizForm = () => {
  const { creationStatus, error, result, updationStatus } = useSelector((state) => state.quiz);

  const { token = "" } = useSelector((state) => state.auth);

  const { state = {} } = useLocation();
  const editMode = state?.editMode || false;

  const quizToEdit = state?.quiz || {};

  console.log({ quizToEdit });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log({ creationStatus, error, result });
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      questions: [],
    },
    resolver: yupResolver(quizSchema),
  });

  const questions = watch("questions");

  const handleAddQuestion = async () => {
    await trigger("questions");
    setValue("questions", [
      ...questions,
      {
        question: "",
        options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
        correctAnswer: "",
      },
    ]);
  };

  const onSubmit = (data) => {
    trigger();
    const id = quizToEdit.quiz_id;

    if (editMode) {
      dispatch(updateQuiz({ id, data, token })).unwrap();
    } else {
      dispatch(createQuiz({ data, token })).unwrap();
    }
  };

  useEffect(() => {
    if (editMode) {
      const populateCorrectAnswerValue = (quiz) => {
        const updatedQuestions = quiz.questions.map((question) => {
          const correctOption = question.options.find((option) => option.option_id === question.correctAnswer);

          const correctAnswerValue = correctOption ? correctOption.value : "";

          return {
            ...question,
            correctAnswer: correctAnswerValue,
          };
        });

        return {
          ...quiz,
          questions: updatedQuestions,
        };
      };

      if (quizToEdit) {
        const updatedQuiz = populateCorrectAnswerValue(quizToEdit);
        setValue("title", updatedQuiz.title);
        setValue("description", updatedQuiz.description);
        setValue("questions", updatedQuiz.questions);
      }
    }
  }, [editMode, quizToEdit, setValue]);

  useEffect(() => {
    if (creationStatus === "succeeded" || updationStatus === "succeeded") {
      navigate("/quizzes");
    }

    return () => {
      dispatch(clearResult());
    };
  }, [creationStatus, updationStatus]);

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <div className="text-center text-3xl font-semibold text-gray-800 mb-8">
          {editMode ? "Update New Quiz" : " Create New Quiz"}
        </div>
        <Box mt={2}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                label="Quiz Title"
                {...field}
                fullWidth
                size="medium"
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{ mb: 3 }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                label="Description"
                {...field}
                fullWidth
                size="medium"
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{ mb: 3 }}
              />
            )}
          />
        </Box>

        {questions?.map((q, index) => (
          <Card key={index} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6">Question {index + 1}</Typography>
              <Controller
                name={`questions[${index}].question`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Question"
                    {...field}
                    fullWidth
                    size="medium"
                    error={!!errors?.questions?.[index]?.question}
                    helperText={errors?.questions?.[index]?.question?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />
              {q?.options?.map((_, optIndex) => (
                <Controller
                  key={optIndex}
                  name={`questions[${index}].options[${optIndex}].value`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={`Option ${optIndex + 1}`}
                      {...field}
                      fullWidth
                      size="small"
                      error={!!errors?.questions?.[index]?.options?.[optIndex]?.value}
                      helperText={errors?.questions?.[index]?.options?.[optIndex]?.value?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              ))}
              <Controller
                name={`questions[${index}].correctAnswer`}
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Correct Answer"
                    {...field}
                    fullWidth
                    size="small"
                    error={!!errors?.questions?.[index]?.correctAnswer}
                    helperText={errors?.questions?.[index]?.correctAnswer?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </CardContent>
          </Card>
        ))}
        {errors.questions?.message && (
          <Typography color="error" align="center" my={2}>
            {errors.questions?.message}
          </Typography>
        )}
        <Box display="flex" justifyContent="center" gap={2} mt={4}>
          <Button variant="contained" onClick={handleAddQuestion} sx={{ textTransform: "none" }}>
            Add Another Question
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            sx={{ textTransform: "none" }}
            disabled={status === "loading"}
          >
            {status === "loading" ? <CircularProgress size={24} /> : "Create Quiz"} {/* Show loading spinner */}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminQuizForm;
