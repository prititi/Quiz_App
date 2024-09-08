import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";

const pages = [
  { name: "Home", redirect: "/" },
  { name: "Quiz Creation", redirect: "/create" },
  { name: "View Quizzes", redirect: "/quizzes" },
  { name: "Taking a Quiz", redirect: "/quizzes" },
  { name: "Leaderboard", redirect: "/quizzes" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const auth = useSelector((state) => state.auth);
  console.log({ auth });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const filteredPages = auth?.token ? pages : pages.filter((page) => page.name !== "Quiz Creation");

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="https://png.pngtree.com/png-vector/20220520/ourmid/pngtree-comic-speech-bubbles-with-text-quiz-png-image_4667086.png"
            alt="app bar logo"
            style={{ height: "60px", width: "60px" }}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {filteredPages.map((page) => (
              <Button
                key={page.name}
                className="normal-case"
                onClick={() => navigate(page.redirect)}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {auth.status === "succeeded" ? (
            <Button
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "gray",
                },
                width: "90px",
                marginX: 2,
              }}
              variant="contained"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "lightgray",
                  },
                  width: "90px",
                }}
                variant="contained"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                  width: "90px",
                  marginX: 2,
                }}
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {filteredPages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.redirect);
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
