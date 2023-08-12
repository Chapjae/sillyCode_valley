const router = require("express").Router();
// let socket = io()
const { createServer } = require("http");
const server = require("http").createServer();
const io = require("socket.io")(server)
const {v4: uuidv4} = require("uuid")

// const httpServer = createServer();

router.get("/testing", (req, res) => {
  res.redirect(`/testing/${uuidv4()}`)
})

router.get("/:room", (req, res) => {
  res.render("room", {roomid: req.params.room})
});



// io.on("connection", socket => {
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user-connected', userId)

//     socket.on('disconnect', () => {
//       socket.to(roomId).broadcast.emit('user-disconnected', userId)
//     })
//   })
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


// server.listen(3001, () => {
//   console.log("testing")
// })
module.exports = router