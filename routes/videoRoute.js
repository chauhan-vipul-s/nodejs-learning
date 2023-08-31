const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getVideo, postVideo } = require("../controllers/videoController");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getVideo).post(postVideo);

router
  .route("/:name")
  .get((req, res) =>
    res.send("get a video of perticular profile viewing user" + req.params.name)
  );

router
  .route("/update/:id")
  .put((req, res) => res.send("update video by id" + req.params.id));

module.exports = router;
