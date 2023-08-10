const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server)

app.set("view engine");
app.use(express.static("public"))



server.listen(3000)