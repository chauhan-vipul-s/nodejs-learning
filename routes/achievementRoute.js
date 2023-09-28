const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getAchievementById,
  postAchievement,
} = require("../controllers/achievementController");

const router = express.Router();

router.use(validateToken);

router.route("/").post(postAchievement);

router.route("/:id").get(getAchievementById);

module.exports = router;
