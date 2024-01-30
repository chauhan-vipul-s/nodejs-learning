const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const generationConfig = {
  maxOutputTokens: 100,
};

const genAI = () => new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function googleAI(prompt) {
  const model = genAI().getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
async function googleImageAI(prompt,image) {
  const model = genAI().getGenerativeModel({
    model: "gemini-pro-vision",
    generationConfig,
  });

  console.log("here it comes")
      const videoData = image.buffer.toString("base64");
    const dataUrl = `data:${image.mimetype};base64,${videoData}`;
  const payloadImage = {
    inlineData: {
      data: videoData,
      mimeType: "image/png",
    },
  };
  
  
  const result = await model.generateContent([prompt, payloadImage]);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = { googleAI,googleImageAI };
