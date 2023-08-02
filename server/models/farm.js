const mongoose = require("mongoose");
require("dotenv").config();

const farmSchema = mongoose.Schema(
  {
    farmName: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coordinates: {
      type: Array,
      default: [],
      required: true,
      unique: true,
      maxLength: 100,
    },
    soilHealth: {
      type: Array,
      default: [],
      required: false,
      unique: false,
      maxLength: 100,
    },
    cropYield: {
      type: Array,
      default: [],
      required: false,
      unique: false,
      maxLength: 100,
    },
    serviceTier: {
      type: String,
      required: true,
      unique: false,
      maxLength: 100,
      trim: true,
    },
  },
  { timestamps: true }
);

const Farm = mongoose.model("Farm", farmSchema);

module.exports = { Farm };
