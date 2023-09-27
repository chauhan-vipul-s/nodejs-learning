const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  udpateComedian,
  getComedianInfo,
  getComedianInfoByUserName,
} = require("../controllers/comedianController");

const router = express.Router();

router.use(validateToken);

router.route("/").patch(udpateComedian).get(getComedianInfo);

router.route("/:username").get(getComedianInfoByUserName);

module.exports = router;
