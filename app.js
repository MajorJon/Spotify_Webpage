const express = require("express"),
  authRoutes = require("./routes/auth-routes"),
  passportSetup = require("./config/passport-setup"),
  getRecentlyPlayed = require("./config/https-requests"),
  mongoose = require("mongoose"),
  keys = require("./config/keys"),
  passport = require("passport"),
  cookieSession = require("cookie-session"),
  app = express();

//set view engine and views folder
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use("/assets", express.static("assets"));

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initialize passport, cookie session
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

// set up routes
app.use("/auth", authRoutes);

//render homescreen
app.get("/", (req, res) => {
  let song = "Artist - Name";
  if ("undefined" != typeof accToken) {
    getRecentlyPlayed(accToken)
      .then(data => {
        if (data) {
          song = data.name + " - " + data.artists[0].name;
        } else {
          song = "Nothing Currently Playing";
        }
      })
      .then(() => {
        res.render("home", {
          user: req.user,
          songTitle: song
        });
      })
      .catch(error => console.log(error));
  } else {
    res.render("home", {
      user: req.user,
      songTitle: song
    });
  }
});

app.listen(8888, () => {
  console.log("app now listening for requests on port 8888");
});
