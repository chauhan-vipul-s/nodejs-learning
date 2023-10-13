const asyncHandler = require("express-async-handler");

const User = require("../models/usersModel");
const Videos = require("../models/videoSchema");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Set up a storage engine for Multer
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

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
  const yourReview =
    video.allReview.find((data) => data.id === req.user.id)?.rea || 0;
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
    yourReview,
  };
  res.status(200).json(videoData);
});

// @desc post video for that user
// @route POST /api/videos/
// @access private
const postVideo = asyncHandler(async (req, res) => {
  const { title, url, thumbnail, description, tags } = req.body;

  if (!title || !url || !thumbnail) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const uploadedVideo = await Videos.create({
      title,
      description,
      url,
      thumbnail,
      tags,
      uploader: req.user.id,
    });

    res.json(uploadedVideo);
  } catch (error) {
    console.error("Error uploading video.", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// @desc handle rating change
// @route POST /api/videos/rate/:id(video id)
// @access private
const updateRatingForVideo = asyncHandler(async (req, res) => {
  const { rate } = req.body;
  const videoId = req.params.id;
  if (!(rate > -1 && rate < 6)) {
    res.status(400).send({ msg: "Rating not allowed." });
  }
  try {
    const updatedAllReview = {
      id: videoId,
      rate: rate,
    };
    const previousData = await User.findOne({ _id: req.user.id });
    const newUpdatedReviewUserList = [
      ...previousData.yourReview.filter((rateObj) => rateObj.id !== videoId),
      updatedAllReview,
    ];

    const updatedAllVideoReview = {
      id: req.user.id,
      rate: rate,
    };
    const previousVideoData = await Videos.findOne({ _id: videoId });
    const newUpdatedReviewVideoList = [
      ...previousVideoData.allReview.filter(
        (rateObj) => rateObj.id !== req.user.id
      ),
      updatedAllVideoReview,
    ];

    let sum = 0,
      avg = 0;
    newUpdatedReviewVideoList.forEach((objList) => {
      sum = sum + objList.rate;
    });

    avg = sum / newUpdatedReviewVideoList.length;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { yourReview: newUpdatedReviewUserList },
      {
        new: true,
      }
    );

    const video = await Videos.findByIdAndUpdate(
      videoId,
      { rating: avg, allReview: newUpdatedReviewVideoList },
      {
        new: true,
      }
    );

    res.status(200).send(video);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong." });
  }
});

module.exports = {
  getVideo,
  postVideo,
  getSingleVideo,
  getVideosByUserName,
  updateRatingForVideo,
};
