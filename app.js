const express = require("express"),
  authRoutes = require("./routes/auth-routes"),
  passportSetup = require("./config/passport-setup"),
  getRecentlyPlayed = require("./config/https-requests"),
  mongoose = require("mongoose"),
  keys = require("./config/keys"),
  passport = require("passport"),
  cookieSession = require("cookie-session"),
  Vibrant = require("node-vibrant"),
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

var artist;
var song;
var songUrl;
var rgb;

//render homescreen
app.get("/", (req, res) => {
  if ("undefined" != typeof accToken) {
    getRecentlyPlayed(accToken).then(data => {
      if (data) {
        loadSongInfo(data);
        getColorPalette(songUrl).then(() => {
          loadHomeWithTrack(req, res);
        });
      } else {
        loadHomeWithoutTrack(req, res);
      }
    });
  } else {
    loadHomeWithoutTrack(req, res);
  }
});

function loadHomeWithTrack(req, res) {
  rgb = rgb[0] + "," + rgb[1] + "," + rgb[2];
  res.render("home", {
    user: req.user,
    songTitle: song,
    artistName: artist,
    albumCover: songUrl,
    songloaded: true,
    color: rgb
  });
}

//helper functions 
function loadHomeWithoutTrack(req, res) {
  res.render("home", {
    user: req.user,
    songloaded: false
  });
}

function loadSongInfo(data) {
  songUrl = data.album.images[0].url;
  song = data.name;
  artist = data.artists[0].name;
}

function getColorPalette(image) {
  return Vibrant.from(image)
    .getPalette()
    .then(data => {
      rgb = data.Vibrant.rgb;
    });
}

app.listen(8888, () => {
  console.log("app now listening for requests on port 8888");
});
