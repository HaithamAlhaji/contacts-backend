const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username should be unique"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: [true, "Email address should be unique"],
    },
    password: {
      type: String,
      required: [true, "Username is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
