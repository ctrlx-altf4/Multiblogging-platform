const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Tags", tagsSchema);
