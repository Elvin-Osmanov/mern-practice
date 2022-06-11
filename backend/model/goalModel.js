const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      required: true,
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    text: {
      type: String,
      required: [true, "Please add a text"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
