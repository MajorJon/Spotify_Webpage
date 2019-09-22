const router = require('express').Router(),
 passport = require('passport');


//auth login
router.get('/login', (req, res) => {
  res.render('login', {user: req.user});
});

//auth logout
router.get('/logout', (req,res) => {
  req.logOut();
  res.redirect('/');
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
    res.redirect('/');
  }
);

module.exports = router;