const asyncHandler = require("express-async-handler");

const User = require("../models/usersModel");
const Videos = require("../models/videoSchema");

// @desc get video of user
// @route GET /api/video/
// @access private
const getVideo = asyncHandler(async (req, res) => {
  const videosList =
    (await Videos.find({ uploader: req.user.id })
      .populate("uploader")
      .sort({ createdAt: -1 })) || [];
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
  res.status(200).json(videos);
});

// @desc get video of user
// @route GET /api/video/user/:name
// @access private
const getVideosByUserName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ username: name });

  if (user) {
    const videosList =
      (await Videos.find({ uploader: user._id })
        .populate("uploader")
        .sort({ createdAt: -1 })) || [];

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
    res.status(200).json(videos);
  } else {
    res.status(400).send({ msg: "No such user found with this username." });
  }
});

// @desc get single video by id
// @route GET /api/video/:id
// @access private
const getSingleVideo = asyncHandler(async (req, res) => {
  const video =
    (await Videos.findOne({ _id: req.params.id }).populate("uploader")) || {};
  const videoData = {
    _id: video._id,
    title: video.title,
    rating: video.rating,
    nickName: video.uploader.nickName,
    username: video.uploader.username,
    profilePicture: video.uploader.profilePicture,
    createdAt: video.createdAt,
    thumbnail: video.thumbnail,
    description: video.description,
    url: video.url,
  };
  res.status(200).json(videoData);
});

// @desc post video for that user
// @route POST /api/video/
// @access private
const postVideo = asyncHandler(async (req, res) => {
  const { title, description, url, tags } = req.body;
  if (!title || !url) {
    res.status(404);
    throw new Error("Title and url required for post a video");
  }
  const video = await Videos.create({
    title,
    description,
    url,
    tags,
    uploader: req.user.id,
  });
  res.status(200).json(video);
});

module.exports = {
  getVideo,
  postVideo,
  getSingleVideo,
  getVideosByUserName,
};
