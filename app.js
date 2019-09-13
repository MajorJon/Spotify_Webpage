const express = require("express"),
  authRoutes = require("./routes/auth-routes"),
  passportSetup = require("./config/passport-setup"),
  mongoose = require("mongoose"),
  keys = require("./config/keys"),
  passport = require('passport'),
  cookieSession = require('cookie-session'),
  app = express();

//set view engine and views folder
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", callback => {
  console.log("Successfully connected to mongodb!");
});

// set up routes
app.use("/auth", authRoutes);

//render homescreen
app.get("/", (req, res) => {
  res.sendFile("home.html", { root: "./views" });
});

app.listen(8888, () => {
  console.log("app now listening for requests on port 8888");
});
