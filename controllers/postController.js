const asyncHandler = require("express-async-handler");

const Posts = require("../models/postSchema");

// @desc get posts of user
// @route GET /api/posts/
// @access private
const getPost = asyncHandler(async (req, res) => {
  const posts =
    (await Posts.find({ uploader: req.user.id }).sort({ createdAt: -1 })) || [];
  res.status(200).json(posts);
});

// @desc post posts for that user
// @route POST /api/posts/
// @access private
const postPost = asyncHandler(async (req, res) => {
  const { content, url, tags, isShow, showOnDate } = req.body;
  if (!content || !url) {
    res.status(404);
    throw new Error("Content and url required for post a video");
  }
  const post = await Posts.create({
    content,
    url,
    tags,
    isShow,
    showOnDate,
    uploader: req.user.id,
  });
  res.status(200).json(post);
});

module.exports = {
  getPost,
  postPost,
};
