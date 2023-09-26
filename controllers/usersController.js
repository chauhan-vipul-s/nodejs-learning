// import asynch handler
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

// @desc register user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("userName, email and password Fields are required");
  }
  const userAvailableEmail = await User.findOne({ email });
  const userAvailableName = await User.findOne({ username });

  if (userAvailableName) {
    res.status(400);
    throw new Error("UserName Already Registered.");
  }

  if (userAvailableEmail) {
    res.status(400);
    throw new Error("User Already Registered.");
  }

  // create a hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid.");
  }

  res.json({
    message: "register successfull now you can login !!",
  });
});

// @desc login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("userName, email and password Fields are required");
  }
  const user = await User.findOne({ email });
  console.log(user, 'user')
  if (user && (await bcrypt.compare(password, user.password))) {
    // jwt.sign(payload,uniquekey,expire time)
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
          verified: user.verified,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );
    return res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Username or Passwrod is not valid.");
  }
});

// @desc current user
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
