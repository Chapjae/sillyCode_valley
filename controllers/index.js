const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes")

router.use("/", homeRoutes);
// http://localhost:3000/
router.use("/api", apiRoutes);
// http://localhost:3000/api
module.exports = router
