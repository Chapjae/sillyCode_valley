const express = require("express");
const http = require("http");
const socket = require("socket.io");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
const { v4: uuidv4 } = require("uuid");
const helpers = require("./utils/helpers");

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

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', connection);
// app.use(session(sess));

app.get("/room", (req, res) => {
  console.log({ req, res })
  res.render("room")
});


// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

// socket.on("offer", payload => {
//   io.to(payload.target).emit( "offer", payload);
// });

// socket.on("answer", payload => {
//   io.to(payload.target).emit("answer", payload);
// });

// socket.on("ice-candadite", incoming => {
//   io.to(incoming.target).emit("ice-candidate", incoming-candidate);
// });


server.listen(8000, () => {
  console.log('listening on: 8000');
});