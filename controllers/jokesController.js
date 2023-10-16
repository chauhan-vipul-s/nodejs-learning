const asyncHandler = require("express-async-handler");

const User = require("../models/usersModel");
const Jokes = require("../models/jokesSchema");

// @desc get jokes of user
// @route GET /api/jokes/
// @access private
const getJokes = asyncHandler(async (req, res) => {
  const jokes =
    (await Jokes.find({ uploader: req.user.id }).sort({ createdAt: -1 })) || [];
  res.status(200).json(jokes);
});

// @desc get jokes list by user name
// @route GET /api/jokes/user/:name
// @access private
const getJokesByUsername = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ username: name });

  if (user) {
    const jokesList =
      (await Jokes.find({ uploader: user._id })
        .populate("uploader")
        .sort({ createdAt: -1 })) || [];

    const jokes = jokesList.map((joke) => ({
      _id: joke._id,
      content: joke.content,
      rating: joke.rating,
      nickName: joke.uploader.nickName,
      username: joke.uploader.username,
      profilePicture: joke.uploader.profilePicture,
      createdAt: joke.createdAt,
    }));
    res.status(200).json(jokes);
  } else {
    res.status(400).send({ msg: "No such user found with this username." });
  }
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
  getJokesByUsername,
};
