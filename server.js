const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const {create} = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
// const helpers = require("./utils/helpers");

// const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3000

// setup handlebars below if we decide to stick with it as a templating language 
const hbs = exphbs.create({helpers});

// const sess = {
//   secret: "Test secret",
//   cooke:{},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

// might need to use app.engine("templateLanguageName", something.engine) here
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });


server.listen(3000)