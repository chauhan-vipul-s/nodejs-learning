const asyncHandler = require("express-async-handler");
const { googleAI, googleImageAI } = require("../common/GoogleAPI");

// @desc ai by prompt API
// @route POST /api/gemini-ai/
// @access private
const getGeminiAi = asyncHandler(async (req, res) => {
  const response = await googleAI(req.body.prompt);
  res.status(200).json({ response });
});
const getGeminiAiImage = asyncHandler(async (req, res) => {
  const response = await googleImageAI(req.body.prompt,req.file);
  res.status(200).json({ response });
});

module.exports = {
  getGeminiAi,
  getGeminiAiImage,
};
