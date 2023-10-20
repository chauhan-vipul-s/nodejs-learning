const asyncHandler = require("express-async-handler");

const cloudinary = require("cloudinary").v2;

const User = require("../models/usersModel");
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

// @desc get posts of user by username
// @route GET /api/posts/:name
// @access private
const getPostsByUserName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ username: name });

  if (user) {
    const postsList =
      (await Posts.find({ uploader: user._id })
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
  } else {
    res.status(400).send({ msg: "No such user found with this username." });
  }
});

// @desc get post by id
// @route GET /api/posts/:id
// @access private
const getSinglePost = asyncHandler(async (req, res) => {
  const postFiltered =
    (await Posts.findOne({ _id: req.params.id }).populate("uploader")) || {};

  const post = {
    _id: postFiltered._id,
    content: postFiltered.content,
    rating: postFiltered.rating,
    nickName: postFiltered.uploader.nickName,
    username: postFiltered.uploader.username,
    profilePicture: postFiltered.uploader.profilePicture,
    createdAt: postFiltered.createdAt,
    thumbnail: postFiltered.url,
  };
  res.status(200).json(post);
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
  getSinglePost,
  getPostsByUserName,
};
