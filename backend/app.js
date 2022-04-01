const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();


const app = express();

const server = http.createServer(app);

const io = require("socket.io").listen(server);
const port = process.env.PORT || 4000;

server.listen(port, "0.0.0.0");

app.use(cors());

app.use(express.static("build"));
app.use(express.static("public"));


io.on("connection", function (socket) {
  console.log("Connected succesfully to the socket ...");
  socket.on("pause-video", (data) => {
    console.log("pause-video");
    io.emit("video-paused", data);
  });
  
  socket.on("play-video", (data) => {
    console.log("play-video");
    io.emit("video-played", data);
  });
});




app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// parse application/json
app.use(bodyParser.json({ limit: "10mb" }));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

