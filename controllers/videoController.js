const asyncHandler = require("express-async-handler");

const Videos = require("../models/videoSchema");

// @desc get video of user
// @route GET /api/video/
// @access private
const getVideo = asyncHandler(async (req, res) => {
  const videos = (await Videos.find({ uploader: req.user.id })) || [];
  res.status(200).json(videos);
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
};
