const express = require("express");

const router = express.Router();

const Videos = require("../models/videoSchema");

router.route("/videos").get(async (req, res) => {
  const latestVideos = await Videos.find({})
    .populate("uploader")
    .sort({ createdAt: -1 })
    .limit(4)
    .exec();

  const videos = latestVideos.map((video) => ({
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

module.exports = router;
