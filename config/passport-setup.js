const passport = require("passport"),
  SpotifyStrategy = require("passport-spotify").Strategy,
  keys = require("./keys"),
  User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user.id);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotify.clientID,
      clientSecret: keys.spotify.clientSecret,
      callbackURL: "/auth/spotify/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ spotifyId: profile.id }).then(currentUser => {
        if (currentUser) {
          console.log("User is: ", currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            spotifyId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created: " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);