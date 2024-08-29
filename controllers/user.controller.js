const User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { buildToken, verifyToken } = require("../util/jwtToken");

exports.signup = async (req, res) => {
  try {
    console.log("Signup");
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        status: false,
        message: "Invalid Details",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Email",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json({
      status: false,
      message: "Success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message || "INERNAL SERVER ERROR",
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("login");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Invalid Details",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Email",
      });
    }

    const user = await User.findOne({
      email,
    });

    const passVerification = bcrypt.compareSync(password, user.password);

    if (!passVerification) {
      return res.status(400).json({
        status: false,
        message: "Password doesn't match !!",
      });
    }
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: "USER",
    };
    const token = await buildToken(data);
    return res.status(200).json({
      status: false,
      message: "Success",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message || "INERNAL SERVER ERROR",
    });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("req.user ======", req.user);
    console.log("update");

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "user doesn't exists !!",
      });
    }

    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.name = req.body.name || user.name;
    await user.save();

    return res.status(200).json({
      status: false,
      message: "updated successfully !!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message || "INERNAL SERVER ERROR",
    });
  }
};

exports.image = async (req, res) => {
  try {
    console.log("req.user ======", req.user);
    console.log("update");

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "user doesn't exists !!",
      });
    }

    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.name = req.body.name || user.name;
    await user.save();

    return res.status(200).json({
      status: false,
      message: "updated successfully !!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error?.message || "INERNAL SERVER ERROR",
    });
  }
};
