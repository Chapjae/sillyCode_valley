const express = require("express");
const http = require("http");
const socket = require("socket.io");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
const { v4: uuidv4 } = require("uuid");
const helpers = require("./utils/helpers");
const cloudinary = require('cloudinary');
const axios = require('axios');
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { Video } = require('./models');
const app = express();

const PORT = process.env.PORT || 3000
// const server = http.createServer(app);
// const io = socket(server)
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SECRET_KEY,
  cookie:{},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});