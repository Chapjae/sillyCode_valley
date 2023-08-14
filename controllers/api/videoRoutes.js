const router = require("express").Router();
const cloudinary = require("cloudinary").v2; // Setting up Cloudinery
const { v4: uuidv4 } = require("uuid");
const { Video, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const videoData = await Video.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    res.status(200).json(videoData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const videoData = await Video.create({
      link: req.body.url,
      user_id: req.session.user_id
    });
    res.status(200).json(videoData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
