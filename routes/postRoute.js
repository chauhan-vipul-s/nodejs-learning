const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getPost, postPost } = require("../controllers/postController");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getPost).post(postPost);

router
  .route("/:name")
  .get((req, res) =>
    res.send("get a post of pertifular profile viewing user" + req.params.name)
  );

router
  .route("/update/:id")
  .put((req, res) => res.send("update post by id" + req.params.id));

module.exports = router;
