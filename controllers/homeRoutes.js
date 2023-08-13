const router = require("express").Router();
// let socket = io()
const { createServer } = require("http");
const server = require("http").createServer();
const io = require("socket.io")(server)
const {v4: uuidv4} = require("uuid")

// const httpServer = createServer();

router.get("/videos", async (req, res) => {
  try{
    res.render("videoapitest")
  } catch (err) {
    console.error("error", err)
  }
})

module.exports = router