const passport = require("passport"),
  SpotifyStrategy = require("passport-spotify").Strategy,
  keys = require("./keys");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotify.clientID,
      clientSecret: keys.spotify.clientSecret,
      callbackURL: "/auth/spotify/callback"
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      try {
        const userResponse = {
          ...profile,
          accessToken,
          refreshToken,
          expires_in
        };
        done(null, userResponse);
      } catch (err) {
        done(err, null, {
          message: "An error ocurred trying to authenticate the user"
        });
      }
    }
  )
);


