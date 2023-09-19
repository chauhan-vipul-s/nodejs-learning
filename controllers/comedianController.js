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
    _id: user._id,
  };
  res.status(200).json(userData);
});

module.exports = {
  udpateComedian,
  getComedianInfo,
};
