const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getPost, postPost } = require("../controllers/postController");
const multer = require("multer");

const router = express.Router();

// Set up a storage engine for Multer
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.use(validateToken);

router.route("/").get(getPost).post(upload.single("fileData"),postPost);

router
  .route("/:name")
  .get((req, res) =>
    res.send("get a post of pertifular profile viewing user" + req.params.name)
  );

router
  .route("/update/:id")
  .put((req, res) => res.send("update post by id" + req.params.id));

module.exports = router;
