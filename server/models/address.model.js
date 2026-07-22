const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"],
    },

    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid pincode"],
    },

    locality: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    landmark: { type: String },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    alternateNumber: { type: String },

    country: {
      type: String,
      default: "India",
    },

    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate addresses for the same user
addressSchema.index(
  {
    user: 1,
    locality: 1,
    area: 1,
    city: 1,
    state: 1,
    pincode: 1,
  },
  { unique: true },
);

module.exports = mongoose.model("Address", addressSchema);
