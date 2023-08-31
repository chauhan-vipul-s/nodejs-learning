const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getJokes, postJokes } = require("../controllers/jokesController");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getJokes).post(postJokes);

router
  .route("/:name")
  .get((req, res) =>
    res.send("get a jokes of pertifular profile viewing user" + req.params.name)
  );

router
  .route("/update/:id")
  .put((req, res) => res.send("update jokes by id" + req.params.id));

module.exports = router;
