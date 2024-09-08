import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Alert, Button, CircularProgress, Link, TextField, useMediaQuery, useTheme } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log({ auth });

  useEffect(() => {
    if (auth.status === "succeeded") {
      navigate("/");
    }
  }, [auth.status, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await fetch("https://dummy-q-server.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[300px] lg:grid-cols-2 xl:min-h-[500px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="flex justify-start flex-col gap-3">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground text-[#71717A]">Enter your email below to login to your account</p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <span className="text-black" htmlFor="email">
                Email
              </span>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                variant="outlined"
                label="Email"
                fullWidth
                size="small"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span htmlFor="password">Password</span>
                {/* <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link> */}
              </div>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                variant="outlined"
                label="Password"
                fullWidth
                size="small"
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              disabled={auth.status === "loading"}
              className="mx-auto w-full text-lg mt-4 normal-case"
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2F2F31",
                },
              }}
            >
              <span className="normal-case">
                {auth.status === "loading" ? <CircularProgress size={24} /> : "Login"}
              </span>
            </Button>

            {auth.status === "failed" && (
              <div className="mt-4">
                <Alert severity="error">{auth.error}</Alert>
              </div>
            )}
          </form>
          <div className="mt-4 text-center text-sm text-[#6C6C6E]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="">
          <img
            // src="https://png.pngtree.com/png-clipart/20210502/original/pngtree-quiz-png-transparent-background-png-image_6271115.jpg"
            src="https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-comic-speech-bubbles-with-text-quiz-png-image_4667086.png"
            alt="Image"
            width="1500"
            height="800"
            className="h-[80%] w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
