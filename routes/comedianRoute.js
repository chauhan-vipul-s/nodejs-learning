const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  udpateComedian,
  getComedianInfo,
} = require("../controllers/comedianController");

const router = express.Router();

router.use(validateToken);

router.route("/").patch(udpateComedian).get(getComedianInfo);

module.exports = router;
