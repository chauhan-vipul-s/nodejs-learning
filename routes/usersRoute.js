const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  forgetPassword,
} = require("../controllers/usersController");
const validateToken = require("../middleware/validateTokenHandler");

// take router from express
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.get("/forget-password", forgetPassword);

module.exports = router;
