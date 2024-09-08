const { UserModel } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashpass,
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role }, // Payload
      "quiz", // Secret key
      { expiresIn: "15d" } // Token expiration
    );

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      token, // Include the token in the response
      data: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Create user!",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found! Register first.",
      });
    }

    const checkpass = await bcrypt.compare(req.body.password, user.password);

    if (!checkpass) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      // process.env.JWT_SECRET_KEY,
      "quiz",
      { expiresIn: "15d" }
    );

    res.status(200).json({
      success: true,
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
