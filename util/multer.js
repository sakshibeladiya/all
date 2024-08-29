const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("storage")) {
      fs.mkdirSync("storage");
    }
    cb(null, "storage");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname.replace(/ /g, "");
    cb(null, uniqueSuffix);
  },
});

exports.upload = multer({ storage: storage });
