const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the title"],
    },
    description: {
      type: String,
    },
    url: {
      type: String,
      required: [true, "Something went wrong."],
    },
    rating: {
      type: Number,
      default: 0,
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
