// import asynch handler
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { emailUser, emailPassword } = require("../config/smtpConfig");

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

// @desc forget password token generation api
// @route POST /api/users/forget-password
// @access public
const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: emailUser, pass: emailPassword },
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "For reset password",
      html: `<p>Hii ${name} Please copy link and reset your password.<br/>
      <a target="_blank" href=${
        "http://localhost:3000/reset-password?token=" + token
      }>Link</a>
      </p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent.", info.response);
      }
    });
  } catch (error) {
    res.send(400).send({ msg: error.message });
  }
};
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email });
    if (userData) {
      const randomstringvar = randomstring.generate();
      await User.updateOne(
        { email: email },
        { $set: { resetToken: randomstringvar } }
      );
      sendResetPasswordMail(userData.username, email, randomstringvar);
      res.status(200).send({ msg: `Email sent to ${email} successfully` });
    } else {
      res.status(200).send({ msg: "This email does not exist." });
    }
    res.status(200).send({ msg: "API called" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  forgetPassword,
};
