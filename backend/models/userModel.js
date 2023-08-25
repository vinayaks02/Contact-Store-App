const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    workInfo: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create model
const User = mongoose.model("User", userSchema);
module.exports = User;
