const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const { Video, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

const storeVideoData = async () => {
  try {
    const options = {
      resource_type: "video",
    };
    const result = await cloudinary.api.resources(options);
    for (const resource of result.resources) {
      if (resource.resource_type === "video") {
        const existingVideo = await Video.findOne({
          where: { link: resource.url },
        });
        if (!existingVideo) {
          await Video.create({
            link: resource.url,
          });
        }
      }
    }
    console.log("Video data stored successfully.");
  } catch (error) {
    console.error("Error storing video data:", error);
  }
};

router.get("/", async (req, res) => {
  storeVideoData();
  try {
    const videoData = await Video.findAll({
      // include: [
      //   {
      //   model: User,
      // },
      // ],
    });

    const videos = videoData.map((video) => {
      return video.get({
        plain: true,
      });
    });
    console.log(videos);

    res.render("homepage", { videos });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comments/:id", withAuth, async (req, res) => {
  const videoId = req.params.id;
  try {
    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json(`wrong page 404`);
    }
    const link = video.dataValues.link;

    const commentData = await Comment.findAll({
      where: {
        video_id: videoId,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    console.log(commentData)

    // serialized the comments
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Sending the fetched comment data instead of "comments"
    res.render("comments", { comments, link });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments." });
  }
});

router.get("/room", withAuth, (req, res) => {
  res.render("room");
});


router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login", {});
});

module.exports = router;
