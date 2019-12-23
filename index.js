const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new socketIO(server);
const adapter = new FileSync("data.json");

const db = low(adapter);
db.defaults({ user: [], chat: [], pizza: [] }).write();

require("./socket.js")(io, db);
app.use("/", express.static("./dist"));

server.listen(PORT, () => {
  console.log(`API listening @ Port ${PORT}`);
});
