const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sakshi:smongodb@newuser.gkfkevi.mongodb.net/dreamTrail"
  )
  .then(console.log("mongodb connected"))
  .catch((e) => {
    console.log("mongodb connection error", e?.message);
  });
