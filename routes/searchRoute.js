const express = require("express");

const validateToken = require("../middleware/validateTokenHandler");

const { getSearch } = require("../controllers/searchController");

const router = express.Router();

router.use(validateToken);

router.route("/").post(getSearch);

module.exports = router;
 