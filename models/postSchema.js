const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please add the some content"],
    },
    url: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    showOnDate: {
      type: Date,
    },
    rating: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model("Post", postSchema);
