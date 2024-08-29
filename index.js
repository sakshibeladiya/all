require("dotenv").config();
const express = require("express");
const app = express();
require("./util/mongodb");
const http = require("http");
const route = require("./route");
const jwt = require("jsonwebtoken");
const path = require("path");

const server = http.createServer(app);
const io = require("socket.io")(server);
console.log(jwt.sign("secretKey", process.env.jwtAuth));

io.use(function (socket, next) {
  console.log("authenticate");
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.jwtAuth,
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", function (socket) {
  socket.on("message", function (message) {
    console.log("message", message);
    io.emit("message", message);
  });
});

const checkMiddeware = (req, res, next) => {
  console.log(req?.path);
  next();
};

app.use("/storage", express.static(path.join("storage")));
app.use(express.static(path.join("public")));

app.use(express.json());

app.use("/", checkMiddeware, route);
app.set("view engine", "ejs");
app.set("views", path.join("views"));

app.get("/", (req, res) => {
  return res.send("SERVER STARED  ");
});

app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "public", "index.html"));
  res.render("error", { message: "error", title: "ERROR" });
});

server.listen(process.env.PORT, () => {
  console.log("server started on", process.env.PORT);
});
