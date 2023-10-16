const asyncHandler = require("express-async-handler");

const Videos = require("../models/videoSchema");
const Post = require("../models/postSchema");
const Jokes = require("../models/jokesSchema");

// @desc get feed video for private
// @route GET /api/feed/trending/video
// @access private
const getTrendingVideo = asyncHandler(async (req, res) => {
  const latestVideos = await Videos.find({})
    .sort({ createdAt: -1 })
    .populate("uploader")
    .exec();

  let highestRatedVideo = null;
  let highestRating = -1;

  for (const video of latestVideos) {
    if (video.rating > highestRating) {
      highestRating = video.rating;
      highestRatedVideo = video;
    }
  }

  const videoData = {
    _id: highestRatedVideo._id,
    title: highestRatedVideo.title,
    rating: Math.floor(highestRatedVideo.rating),
    nickName: highestRatedVideo.uploader.nickName,
    username: highestRatedVideo.uploader.username,
    profilePicture: highestRatedVideo.uploader.profilePicture,
    createdAt: highestRatedVideo.createdAt,
    thumbnail: highestRatedVideo.thumbnail,
    description: highestRatedVideo.description,
    url: highestRatedVideo.url,
  };

  return res.status(200).json({ data: videoData });
});

module.exports = { getTrendingVideo };
