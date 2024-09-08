import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import {
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  CardContent,
  Card,
  Box,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchQuizData, submitQuiz } from "../redux/quizzes/quizThunks";
import { clearResult } from "../redux/quizzes/quizSlice";

// Validation Schema using Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  answers: yup.array().of(yup.string().required("You must select an answer")),
});

const TakeQuiz = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const quizId = searchParams.get("id");
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const quizData = useSelector((state) => state.quiz.quizData);
  const result = useSelector((state) => state.quiz.result);
  const quizStatus = useSelector((state) => state.quiz.status);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      answers: new Array(quizData?.questions?.length)?.fill(""),
    },
  });

  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuizData(quizId));
    }
    return () => {
      dispatch(clearResult());
    };
  }, [dispatch, quizId]);

  const onSubmit = async (data) => {
    console.log(data);

    const questions = quizData?.questions;
    let arr = [];
    data.answers.forEach((answerId, index) => {
      arr = [...arr, { question_id: questions[index].question_id, option_id: answerId }];
    });

    console.log({ arr });

    const payload = {
      userName: data.name,
      startTime: new Date().toISOString(),
      answers: arr,
    };

    try {
      await dispatch(submitQuiz({ quizId, payload })).unwrap();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const currentAnswer = watch(`answers[${step - 1}]`);

  const nextStep = () => {
    setDirection(1); // Moving forward
    setStep(step + 1);
  };

  const prevStep = () => {
    setDirection(-1); // Moving backward
    setStep(step - 1);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  if (quizStatus === "loading") {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (Object.values(result || {})?.length > 0) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Quiz Results
        </Typography>

        <Card variant="outlined" sx={{ mb: 4, mt: 8 }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              User: <strong>{result.user_name}</strong>
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Score:{" "}
              <strong>
                {result.score} / {quizData?.questions?.length}
              </strong>
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Percentage: <strong>{result.percentage}%</strong>
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Time Taken: <strong>{result.timeTaken} seconds</strong>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <div className="container max-w-[500px] mx-auto p-4">
      <div className="text-center text-2xl font-semibold text-gray-800 mt-12 mb-16">{quizData?.title}</div>

      {step === 0 && (
        <motion.div
          key="name"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-8">
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <Button type="button" variant="contained" color="primary" onClick={nextStep}>
              Start Quiz
            </Button>
          </div>
        </motion.div>
      )}

      {step > 0 && step <= quizData?.questions?.length && (
        <motion.div
          key={`question-${step}`}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" component="h2" className="font-bold text-gray-800 mb-4">
            {quizData?.questions[step - 1]?.question}
          </Typography>
          <FormControl component="fieldset" error={!!errors.answers?.[step - 1]} className="mb-6">
            <FormLabel component="legend">Select an answer</FormLabel>
            <Controller
              name={`answers[${step - 1}]`}
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  {quizData?.questions[step - 1]?.options?.map((option) => (
                    <FormControlLabel
                      key={option.option_id}
                      value={option.option_id}
                      control={<Radio />}
                      label={option.value}
                      onClick={() => setValue(`answers[${step - 1}]`, option.option_id)}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.answers?.[step - 1] && <Typography color="error">{errors.answers[step - 1]?.message}</Typography>}
          </FormControl>
        </motion.div>
      )}
      {step > 0 && step <= quizData?.questions?.length && (
        <div className="flex justify-between my-16">
          {step > 1 && (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="small"
              onClick={prevStep}
              startIcon={<ArrowBackIcon />}
            >
              Previous
            </Button>
          )}
          {step < quizData?.questions?.length ? (
            <Button
              type="button"
              variant="contained"
              size="small"
              color="primary"
              onClick={nextStep}
              endIcon={<ArrowForwardIcon />}
              disabled={!currentAnswer}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" size="small" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
