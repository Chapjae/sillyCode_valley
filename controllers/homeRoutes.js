const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const { Video, User } = require('../models');
// let socket = io()
// const { createServer } = require("http");
// const server = require("http").createServer();
// const io = require("socket.io")(server)
// const {v4: uuidv4} = require("uuid")

// const httpServer = createServer();

// router.get("/testing", (req, res) => {
//   res.redirect(`/testing/${uuidv4()}`)
// })

// router.get("/:room", (req, res) => {
//   res.render("room", {roomid: req.params.room})
// });

// router.get('/', async (req, res) => {
//   try {
//   const allVideos = await Video.findAll()
//   res.json(allVideos);
//   } catch(err){
//     res.status(500).json(err)
//   }
// });


router.get("/", async (req, res) => {
  try {
  const videoData = await Video.findAll({
    include: [
      {
      model: User,
    },
    ],
  });

  const videos = videoData.map((video) => {
    return video.get({
      plain: true,
    })
  });
  console.log(videos);

  res.render("homepage", {videos})
  }catch(err) {
    res.status(500).json(err)
  }
  });

router.get("/room", (req, res) => {
  console.log({ req, res })
  res.render("room")
});

const storeVideoData = async () => {
  try {
    const options = {
      resource_type: 'video'
    };
    const result = await cloudinary.api.resources(options);
    for (const resource of result.resources) {
      if (resource.resource_type === 'video') {
        const existingVideo = await Video.findOne({
          where: { link: resource.url }
        });
        if (!existingVideo) {
          await Video.create({
            link: resource.url,
            created_on: resource.created_at,
          });
        }
      }
    }
    console.log('Video data stored successfully.');
  } catch (error) {
    console.error('Error storing video data:', error);
  }
};
storeVideoData();

router.get("/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json(`wrong page 404`);
    } 
    const link = video.dataValues.link
    
    const commentData = await Comment.findAll({
      where: {
        video_id: videoId, 
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // serialized the comments
    const comments = commentData.map((comment) => comment.get({ plain: true}));

    // Sending the fetched comment data instead of "comments"
    res.render("comments", {comments, link}); 
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments." });
  }
});

module.exports = router