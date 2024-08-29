const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
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

UserSchema.pre("save", function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    const pass = bcrypt.hashSync(user.password, 10);
    console.log("pass ===", pass);
    user.password = pass;
    return next();
  } catch (error) {
    console.log("password encypt error", error);
    throw new Error("password encypt error", error.message);
  }
});

module.exports = mongoose.model("User", UserSchema);
