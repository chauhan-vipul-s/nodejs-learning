const express = require("express");
const multer = require("multer");
const { getGeminiAi, getGeminiAiImage } = require("../controllers/geminiAIController");

const router = express.Router();
// Set up a storage engine for Multer
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.route("/").post(getGeminiAi);

// router.route("/upload").post(upload.single("videoData"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     const videoData = req.file.buffer.toString("base64");
//     const dataUrl = `data:${req.file.mimetype};base64,${videoData}`;

//     const result = await cloudinary.uploader.upload(dataUrl, {
//       resource_type: "image",
//       folder: "video", // Replace with your desired folder
//     });

//     res.json({ url: result.secure_url });
//   } catch (error) {
//     console.error("Error uploading video to Cloudinary:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });
router.route("/image").post(upload.single("imageData"),getGeminiAiImage);

module.exports = router;
 