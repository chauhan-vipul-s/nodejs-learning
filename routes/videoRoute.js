const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getVideo,
  postVideo,
  getSingleVideo,
  getVideosByUserName,
} = require("../controllers/videoController");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

router.use(validateToken);

router.route("/").get(getVideo).post(postVideo);

router.route("/:id").get(getSingleVideo);

router.route("/user/:name").get(getVideosByUserName);

router.route("/upload").post(async (req, res) => {
  console.log(req.body);
  try {
    const result = await cloudinary.uploader.upload(req.body.videoData, {
      resource_type: "video",
      folder: "your_upload_folder", // Replace with your desired folder
    });

    // You can save the `result` information in your database if needed.

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading video to Cloudinary:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

router
  .route("/update/:id")
  .put((req, res) => res.send("update video by id" + req.params.id));

module.exports = router;
