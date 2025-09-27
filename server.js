// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from "public" folder
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("input", (data) => {
    io.emit("playerInput", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    io.emit("playerDisconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
