const asyncHandler = require("express-async-handler");

const Jokes = require("../models/jokesSchema");

// @desc get jokes of user
// @route GET /api/jokes/
// @access private
const getJokes = asyncHandler(async (req, res) => {
  const jokes = (await Jokes.find({ uploader: req.user.id })) || [];
  res.status(200).json(jokes);
});

module.exports = {
  getJokes,
  postJokes,
};
