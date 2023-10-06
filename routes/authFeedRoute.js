const express = require("express");

const validateToken = require("../middleware/validateTokenHandler");

const { getFeedVideo, getFeedPosts, getFeedJokes } = require("../controllers/authFeedController");

const { getTrendingVideo } = require("../controllers/authTrendingController");

const router = express.Router();

router.use(validateToken);

router.route("/videos").get(getFeedVideo);

router.route("/posts").get(getFeedPosts);

router.route("/jokes").get(getFeedJokes);

module.exports = router;
