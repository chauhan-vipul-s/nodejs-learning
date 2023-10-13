const asyncHandler = require("express-async-handler");

const cloudinary = require("cloudinary").v2;

const Posts = require("../models/postSchema");

// @desc get posts of user
// @route GET /api/posts/
// @access private
const getPost = asyncHandler(async (req, res) => {
  const postsList =
    (await Posts.find({ uploader: req.user.id })
      .populate("uploader")
      .sort({ createdAt: -1 })) || [];
  const posts = postsList.map((post) => ({
    _id: post._id,
    content: post.content,
    rating: post.rating,
    nickName: post.uploader.nickName,
    username: post.uploader.username,
    profilePicture: post.uploader.profilePicture,
    createdAt: post.createdAt,
    thumbnail: post.url,
  }));
  res.status(200).json(posts);
});

// @desc post posts for that user
// @route POST /api/posts/
// @access private
const postPost = asyncHandler(async (req, res) => {
  const { content, url, tags, isShow, showOnDate } = req.body;
  if (!content || !url) {
    res.status(404);
    throw new Error("Content and file required for post.");
  }
  try {
    const post = await Posts.create({
      content,
      url,
      tags,
      isShow,
      showOnDate,
      uploader: req.user.id,
    });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error uploading post.", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = {
  getPost,
  postPost,
};
