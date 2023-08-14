const router = require("express").Router();
// let socket = io()
const { createServer } = require("http");
const server = require("http").createServer();
const io = require("socket.io")(server)
const {v4: uuidv4} = require("uuid")
const cloudinary = require("cloudinary").v2
const { Video } = require('../models')
const sequelize = require('sequelize')

// const httpServer = createServer();

// router.get("/testing", (req, res) => {
//   res.redirect(`/testing/${uuidv4()}`)
// })

// router.get("/:room", (req, res) => {
//   res.render("room", {roomid: req.params.room})
// });

// router.get("/", async (req, res) => {
//   const options = {
//     resource_type: "video",
//   };
  
//   cloudinary.api.resources(options).then((result) => {
//     // Extract URLs from the result for videos
//     const videoUrls = result.resources
//       .filter((resource) => resource.resource_type === "video") // Filter only video resources
//       .map((resource) => resource);
  
//     console.log(videoUrls);
//   });
  
//   const videoData = await Video.bulkCreate()

//     res.render("homepage")
//   });

router.get("/room", (req, res) => {
  res.render("room")
});


const storeVideoData = async () => {
  try {
    const options = {
      resource_type: 'video'
    };

    const result = await cloudinary.api.resources(options);

    // Extract URLs and created_at keys from the result for videos
    const videoInfo = result.resources
      .filter(resource => resource.resource_type === 'video')
      .map(resource => {
        return {
          link: resource.url,
          created_on: resource.created_at
        };
      });

    // Use Sequelize to store the video data in the database
    // await sequelize.sync(); // Sync the database schema if needed

    for (const video of videoInfo) {
      await Video.create(video);
    }

    console.log('Video data stored successfully.');
  } catch (error) {
    console.error('Error storing video data:', error);
  }
};

storeVideoData();
module.exports = router