const express = require("express");

const { getPublicFeedVideo, getPublicFeedPosts, getPublicFeedJokes } = require("../controllers/feedController");

const router = express.Router();

router.route("/videos").get(getPublicFeedVideo);

router.route("/posts").get(getPublicFeedPosts);

router.route("/jokes").get(getPublicFeedJokes);

module.exports = router;
 