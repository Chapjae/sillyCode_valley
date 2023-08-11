const router = require('express').Router();
const userRoutes = require("./userRoutes");
const videoRoutes = require("./videoRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/videos", videoRoutes);
router.use("/commentRoutes", commentRoutes);


module.exports = router