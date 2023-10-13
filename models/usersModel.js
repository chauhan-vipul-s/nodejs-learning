const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "User Already Exist"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    username: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "User Name Must be Unique."],
    },
    nickName: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    resetToken: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Number,
      default: 0,
    },
    tagline: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement",
      },
    ],
    yourReview: {
      type: Array,
      default: [],
    },
    why: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
