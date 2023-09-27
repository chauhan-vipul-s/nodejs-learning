const asyncHandler = require("express-async-handler");

const User = require("../models/usersModel");

// @desc update user/comedian information
// @route PATCH /api/comedian
// @access private
const udpateComedian = asyncHandler(async (req, res) => {
  const { profilePicture, nickName } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profilePicture, nickName },
    {
      new: true,
    }
  );
  res.status(200).json(user);
});

// @desc get user/comedian information
// @route GET /api/comedian
// @access private
const getComedianInfo = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const userData = {
    email: user.email,
    nickName: user.nickName,
    profilePicture: user.profilePicture,
    username: user.username,
    createdAt: user.createdAt,
    verified: user.verified,
    followers: user.followers || 0,
    _id: user._id,
  };
  res.status(200).json(userData);
});

// @desc get user/comedian/:username information
// @route GET /api/comedian/:username
// @access private
const getComedianInfoByUserName = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  const userData = {
    email: user.email,
    nickName: user.nickName,
    profilePicture: user.profilePicture,
    username: user.username,
    createdAt: user.createdAt,
    verified: user.verified,
    followers: user.followers || 0,
    tagline: user.tagline,
    about: user.about,
    achivements: user.achivements,
    why: user.why,
    _id: user._id,
  };
  res.status(200).json(userData);
});

module.exports = {
  udpateComedian,
  getComedianInfo,
  getComedianInfoByUserName,
};
