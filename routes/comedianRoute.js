const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

router
  .route("/:id")
  .patch((req, res) => res.send("update a user - " + req.params.id))
  .get((req, res) => res.send("get a user - " + req.params.id));;

module.exports = router;
