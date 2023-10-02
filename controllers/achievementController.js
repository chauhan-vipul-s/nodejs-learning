const asyncHandler = require("express-async-handler");

const Achivement = require("../models/achievementModel");

// @desc get achievement information by id
// @route get /api/achievement/:id
// @access private
const getAchievementById = asyncHandler(async (req, res) => {
  const achievement = await Achivement.findOne({ _id: req.params.id });
  res.status(200).json(achievement);
});

// @desc POST achievement information
// @route POST /api/achievement
// @access private
const postAchievement = asyncHandler(async (req, res) => {
  const { image, title } = req.body;
  const achivement = await Achivement.create({
    image,
    title,
    uploader: req.user.id,
  });
  res.status(200).json(achivement);
});

module.exports = { getAchievementById, postAchievement };
