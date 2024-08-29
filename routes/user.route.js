const express = require("express");
const router = express.Router();
const {upload} = require("../util/multer")

const userController = require("../controllers/user.controller");
const { verifyToken } = require("../util/jwtToken");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.patch("/update", verifyToken(["USER"]), userController.update);

router.patch(
  "/image",
  verifyToken(["USER"]),
  upload.single("image"),
  userController.image
);

module.exports = router;
