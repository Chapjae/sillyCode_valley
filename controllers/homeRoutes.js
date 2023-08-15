const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const { Video, User } = require("../models");
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
