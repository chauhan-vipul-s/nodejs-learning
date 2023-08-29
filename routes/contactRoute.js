const express = require("express");
const {
  getAllContacts,
  postContact,
  getContactById,
  putContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// take router from express
const router = express.Router();

// now configure the all routes here
// router.route("/").get(getAllContacts);

// router.route("/").post(postContact);

// router.route("/:id").get(getContactById);

// router.route("/:id").put(putContact);

// router.route("/:id").delete(deleteContact);

router.use(validateToken);

// optimized way to write it if routes was same
router.route("/").get(getAllContacts).post(postContact);
// for post method pass the body and it was handled in the controller

router.route("/:id").get(getContactById).put(putContact).delete(deleteContact);

// after creating all apis
// controller need to be created
// whcih contains all request response logic for all request
// which also provides a connection to the backend

module.exports = router;
