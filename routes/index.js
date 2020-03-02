const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('index', {
    user: req.user
  });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/shelfcallback', passport.authenticate(
  'google',
  {
    // THESE PATHS BELOW MAY BE INCORRECT. CHECK HERE IF ISSUES!
    successRedirect : '/',
    failureRedirect : '/error'
  }
));

router.get('/logout', (req, res) => {
  req.logout();
  // ASK BEN ABOUT THESE ROUTES.  CAN THEY BE SET TO ANY LANDING PAGE?
  res.redirect('/');
});

module.exports = router;