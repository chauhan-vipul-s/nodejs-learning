const asyncHandler = require("express-async-handler");

const Jokes = require("../models/jokesSchema");

// @desc get jokes of user
// @route GET /api/jokes/
// @access private
const getJokes = asyncHandler(async (req, res) => {
  const jokes =
    (await Jokes.find({ uploader: req.user.id }).sort({ createdAt: -1 })) || [];
  res.status(200).json(jokes);
});

// @desc post jokes for that user
// @route POST /api/jokes/
// @access private
const postJokes = asyncHandler(async (req, res) => {
  const { content, tags } = req.body;
  if (!content) {
    res.status(404);
    throw new Error("Content required for post a joke");
  }
  const joke = await Jokes.create({
    content,
    tags,
    uploader: req.user.id,
  });
  res.status(200).json(joke);
});

module.exports = {
  getJokes,
  postJokes,
};
