const router = require('express').Router(),
 passport = require('passport');


//auth login
router.get('/login', (req, res) => {
  res.sendFile('login.html', {root: './views'});
});

//auth logout
router.get('/logout', (req,res) => {
  //handle with passport
  res.send('logging out');
});

//auth with google
router.get('/spotify', passport.authenticate('spotify', {
  scope: ['user-read-playback-state']
}));

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.sendFile('home.html', {root: './views'});
  }
);

module.exports = router;