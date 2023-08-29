const mongoose = require("mongoose");

const jokeSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please add the some content"],
    },
    tags: {
      type: Array,
      default: [],
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

module.exports = mongoose.model("Jokes", jokeSchema);
