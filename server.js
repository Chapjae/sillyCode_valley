const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io =  socket(server)
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
const {v4: uuidv4} = require("uuid");
const helpers = require("./utils/helpers");

// const sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const PORT = process.env.PORT || 3000

const hbs = exphbs.create({ helpers });

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

// app.get("/room", (req, res) => {
//   res.redirect(`/4`)
// })

const rooms = {};

io.on('connection', socket => {
  socket.on('join-room', (roomID) => {
    if(rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }
    const otherUser = rooms[roomID].find(id => id !== socket.id);
    if (otherUser) {
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });
  
  socket.on("offer", payload => {
    io.to(payload.target).emit( "offer", payload);
  });
  
  socket.on("answer", payload => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candadite", incoming => {
    io.to(incoming.target).emit("ice-candidate", incoming-candidate);
  });
  
});

app.get("/room", (req, res) => {
  res.render("room")
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });


server.listen(8000, () => {
  console.log('listening on: 8000');
});