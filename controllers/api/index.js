const router = require('express').Router();
const userRoutes = require("./userRoutes");
const videoRoutes = require("./videoRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
// http://localhost:3000/api/users
router.use("/videos", videoRoutes);
// http://localhost:3000/api/videos
router.use("/comments", commentRoutes);
// http://localhost:3000/api/commentRoutes

module.exports = router