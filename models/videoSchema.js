const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the title"],
    },
    description: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      required: [true, "Something went wrong."],
    },
    rating: {
      type: Number,
      default: 0,
    },
    allReview: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
