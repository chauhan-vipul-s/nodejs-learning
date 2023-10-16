const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getJokes,
  postJokes,
  getJokesByUsername,
} = require("../controllers/jokesController");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getJokes).post(postJokes);

router.route("/user/:name").get(getJokesByUsername);

router
  .route("/update/:id")
  .put((req, res) => res.send("update jokes by id" + req.params.id));

module.exports = router;
