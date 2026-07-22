const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    phone: {
      type: String,
      unique: true,
      sparse: true, // allows null values while keeping uniqueness
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
