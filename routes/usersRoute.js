const express = require("express");
const asyncHandler = require("express-async-handler");
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

router.post(
  "/test500",
  asyncHandler(async (req, res) => {
     res.status(500);
    // return res.status(500);
     throw new error("Error 500 test.");
  })
);

router.post("/register", () => {});

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", resetPassword);

module.exports = router;
