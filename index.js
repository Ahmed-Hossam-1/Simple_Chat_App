const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    io.emit("chat message", msg);

    socket.on("typing", () => {
      socket.broadcast.emit("show_typing_stats");
    });

    socket.on("stop_typing", () => {
      socket.broadcast.emit("clear_typing_stats");
    });
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

/*
  * event driven programming => how to conenction on server {
    * emite => publish to an event using emit("event Name",data)
    * on    => publish to an event using on("event Name", callback)
  }
 */
/*
 * BroadCasting
 */
