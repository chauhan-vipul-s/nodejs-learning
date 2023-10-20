const asyncHandler = require("express-async-handler");

const Videos = require("../models/videoSchema");
const Post = require("../models/postSchema");
const Jokes = require("../models/jokesSchema");

// @desc get feed video for public
// @route GET /api/feed/videos
// @access public
const getPublicFeedVideo = asyncHandler(async (req, res) => {
  const latestVideos = await Videos.find({})
    .sort({ createdAt: -1 })
    .populate("uploader")
    .exec();

  const verifiedVideos = latestVideos
    .filter((video) => video.uploader.verified)
    .slice(0, 4);

  const videos = verifiedVideos.map((video) => ({
    _id: video._id,
    title: video.title,
    rating: video.rating,
    nickName: video.uploader.nickName,
    username: video.uploader.username,
    profilePicture: video.uploader.profilePicture,
    createdAt: video.createdAt,
    thumbnail: video.thumbnail,
  }));

  return res.status(200).json({ data: videos });
});

// @desc get feed post for public
// @route GET /api/feed/posts
// @access public
const getPublicFeedPosts = asyncHandler(async (req, res) => {
  const latestPost = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("uploader")
    .exec();

  const verifiedPost = latestPost
    .filter((post) => post.uploader.verified)
    .slice(0, 4);

  const posts = verifiedPost.map((post) => ({
    _id: post._id,
    content: post.content,
    rating: post.rating,
    nickName: post.uploader.nickName,
    username: post.uploader.username,
    profilePicture: post.uploader.profilePicture,
    createdAt: post.createdAt,
    thumbnail: post.url,
  }));

  return res.status(200).json({ data: posts });
});

// @desc get feed joke for public
// @route GET /api/feed/jokes
// @access public
const getPublicFeedJokes = asyncHandler(async (req, res) => {
  const latestJoke = await Jokes.find({})
    .sort({ createdAt: -1 })
    .populate("uploader")
    .exec();

  const verifiedJoke = latestJoke
    .filter((post) => post.uploader.verified)
    .slice(0, 4);

  const jokes = verifiedJoke.map((joke) => ({
    _id: joke._id,
    content: joke.content,
    rating: joke.rating,
    nickName: joke.uploader.nickName,
    username: joke.uploader.username,
    profilePicture: joke.uploader.profilePicture,
    createdAt: joke.createdAt,
  }));

  return res.status(200).json({ data: jokes });
});

module.exports = { getPublicFeedVideo, getPublicFeedPosts, getPublicFeedJokes };
