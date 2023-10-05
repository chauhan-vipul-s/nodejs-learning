const asyncHandler = require("express-async-handler");

const Video = require("../models/videoSchema");
const Posts = require("../models/postSchema");
const Jokes = require("../models/jokesSchema");

// @desc get videos,posts and joke by search
// @route POST /api/search/
// @access private
const getSearch = asyncHandler(async (req, res) => {
  const { keyword } = req.body;

  const regex = new RegExp(keyword, "i");

  const videosList = await Video.find({
    // uploader: { $ne: req.user.id },
    $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
  })
    .sort({ createdAt: -1 })
    .populate("uploader");

  const videos = videosList.map((video) => ({
    _id: video._id,
    title: video.title,
    rating: video.rating,
    nickName: video.uploader.nickName,
    username: video.uploader.username,
    profilePicture: video.uploader.profilePicture,
    createdAt: video.createdAt,
    thumbnail: video.thumbnail,
  }));

  const postsList = await Posts.find({
    // uploader: { $ne: req.user.id },
    $or: [{ content: { $regex: regex } }],
  })
    .populate("uploader")
    .sort({ createdAt: -1 });

  const posts = postsList.map((post) => ({
    _id: post._id,
    content: post.content,
    rating: post.rating,
    nickName: post.uploader.nickName,
    username: post.uploader.username,
    profilePicture: post.uploader.profilePicture,
    createdAt: post.createdAt,
    thumbnail: post.url,
  }));

  const jokesList = await Jokes.find({
    // uploader: { $ne: req.user.id },
    $or: [{ content: { $regex: regex } }],
  })
    .populate("uploader")
    .sort({ createdAt: -1 });

  const jokes = jokesList.map((joke) => ({
    _id: joke._id,
    content: joke.content,
    rating: joke.rating,
    nickName: joke.uploader.nickName,
    username: joke.uploader.username,
    profilePicture: joke.uploader.profilePicture,
    createdAt: joke.createdAt,
  }));

  res.status(200).json({ videos, posts, jokes });
});

module.exports = {
  getSearch,
};
