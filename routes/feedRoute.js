const express = require("express");

const {
  getPublicFeedVideo,
  getPublicFeedPosts,
  getPublicFeedJokes,
} = require("../controllers/feedController");
const { getTrendingVideo } = require("../controllers/authTrendingController");

const router = express.Router();

router.route("/videos").get(getPublicFeedVideo);

router.route("/posts").get(getPublicFeedPosts);

router.route("/jokes").get(getPublicFeedJokes);

router.route("/trending/video").get(getTrendingVideo);

module.exports = router;
