const router = require("express").Router();
// let socket = io()
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const httpServer = createServer();
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//   // ...
// });


// const {v4 : uuidv4} = require("uuid");

// router.get("/", (req, res) => {
//   res.redirect(`/${uuidv4()}`)
// })

// router.get("/:room", (req, res) => {
//   res.render("room", {roomId: req.params.room})
// });

// function connection (server) {
//   io.on("connection", socket => {
//   socket.on("join-room", (roomId, userId) => {
//     console.log(roomId, userId)
//   })
// });
// }


module.exports = router
