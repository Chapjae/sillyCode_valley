const express = require("express");
const http = require("http");
const socket = require("socket.io");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
const { v4: uuidv4 } = require("uuid");
const helpers = require("./utils/helpers");
const cloudinary = require('cloudinary')

// const sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();

// const PORT = process.env.PORT || 3000
const server = http.createServer(app);
const io = socket(server)
const hbs = exphbs.create({ helpers });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// const sess = {
//   secret: process.env.SECRET_KEY,
//   cooke:{},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

const options = {
  resource_type: "video",
};

cloudinary.v2.api.resources(options).then((result) => {
  // Extract URLs from the result for videos
  const videoUrls = result.resources
    .filter((resource) => resource.resource_type === "video") // Filter only video resources
    .map((resource) => resource.url);

  console.log(videoUrls);
});

server.listen(8000, () => {
  console.log('listening on: 8000');
});

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });