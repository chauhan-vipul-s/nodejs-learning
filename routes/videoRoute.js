const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getVideo,
  postVideo,
  getSingleVideo,
  getVideosByUserName,
} = require("../controllers/videoController");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const router = express.Router();

// Set up a storage engine for Multer
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.use(validateToken);

router.route("/").get(getVideo).post(upload.array("fileData", 2), postVideo);

router.route("/:id").get(getSingleVideo);

router.route("/user/:name").get(getVideosByUserName);

router.route("/upload").post(upload.single("videoData"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const videoData = req.file.buffer.toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${videoData}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      resource_type: "image",
      folder: "video", // Replace with your desired folder
    });

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
