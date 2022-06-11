const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requireq: [true, "Please enter a name"],
    },
    email: {
      type: String,
      requireq: [true, "Please enter a email"],
      unique: true,
    },
    password: {
      type: String,
      requireq: [true, "Please enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
