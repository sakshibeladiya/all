const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "userName",
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    notebook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotBook",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



module.exports = mongoose.model("User", userSchema);
