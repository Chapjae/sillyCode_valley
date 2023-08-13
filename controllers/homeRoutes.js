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



module.exports = router