const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/usersController");
const validateToken = require("../middleware/validateTokenHandler");

// take router from express
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", resetPassword);

module.exports = router;
