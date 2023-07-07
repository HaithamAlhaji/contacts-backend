const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/*
    @desc Register new user
    @route POST /api/users/register
    @access Public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const isUserAvaiable = await User.findOne({ email });
  if (isUserAvaiable) {
    res.status(400);
    throw new Error("User is existed!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!user) {
    res.status(400);
    throw new Error("User is not created!");
  }
  res.status(201).json({ _id: user.id, email: user.email });
});

/*
    @desc Login  user
    @route POST /api/users/login
    @access Public
*/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/*
    @desc Retrive current logged in user
    @route GET /api/users/current
    @access Private
*/
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
