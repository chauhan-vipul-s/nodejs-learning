const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/usersController");

// take router from express
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", currentUser);

module.exports = router;
