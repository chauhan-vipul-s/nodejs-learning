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
// @route POST /api/videos/
// @access private
const postVideo = asyncHandler(async (req, res) => {
  console.log("first");
  const { title, description, tags } = req.body;

  const video = req.files.find((data) => data.mimetype.split("/")[1] === "mp4");
  const image = req.files.find(
    (data) =>
      data.mimetype.split("/")[1] === "jpeg" ||
      data.mimetype.split("/")[1] === "jpg"
  );

  console.log(video, image);

  if (!title || !video || !image) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const videoData = video.buffer.toString("base64");
    const videoDataUrl = `data:${video.mimetype};base64,${videoData}`;
    console.log("videoDataUrl", videoDataUrl);
    const videoUrl = await cloudinary.uploader.upload(videoDataUrl, {
      resource_type: "video",
      folder: "video",
    });

    const imageData = image.buffer.toString("base64");
    const imageDataUrl = `data:${image.mimetype};base64,${imageData}`;

    const imageUrl = await cloudinary.uploader.upload(imageDataUrl, {
      resource_type: "image",
      folder: "thumbnail",
    });

    const uploadedVideo = await Videos.create({
      title,
      description,
      url: videoUrl.secure_url,
      thumbnail: imageUrl.secure_url,
      tags,
      uploader: req.user.id,
    });

    res.json(uploadedVideo);
  } catch (error) {
    console.error("Error uploading video to Cloudinary:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = {
  getVideo,
  postVideo,
  getSingleVideo,
  getVideosByUserName,
};
