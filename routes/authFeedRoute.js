const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

router.route("/videos").get((req,res)=>{
    console.log(req,res);
    return res.status(200).json({ msg: "authorized" });
});

module.exports = router;