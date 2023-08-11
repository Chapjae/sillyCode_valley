const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const{ Server } = require("socket.io");
const io = new Server(server)
const {engine} = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
const {v4: uuidv4} = require("uuid");
// const helpers = require("./utils/helpers");

// const sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const PORT = process.env.PORT || 3000

// setup handlebars below if we decide to stick with it as a templating language 
// const hbs = exphbs.create({helpers});

// const sess = {
//   secret: "Test secret",
//   cooke:{},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', connection);
// app.use(session(sess));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`)
})

app.get("/:room", (req, res) => {
  res.render("room", {roomId: req.params.room})
});

io.on("connection", socket => {
  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId)
  })
});

// might need to use app.engine("templateLanguageName", something.engine) here
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });


server.listen(3000, () => {
  console.log('listening on: 3000');
});