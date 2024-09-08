const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is missing. Please log in to continue.",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  jwt.verify(token, "quiz", (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins are authorized to create quizzes.",
      });
    }
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You're not authenticated to perform this action.",
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUser,
};
