const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getPost,
  postPost,
  getSinglePost,
  getPostsByUserName,
} = require("../controllers/postController");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getPost).post(postPost);

router.route("/:id").get(getSinglePost);

router.route("/user/:name").get(getPostsByUserName);

router
  .route("/update/:id")
  .put((req, res) => res.send("update post by id" + req.params.id));

module.exports = router;
