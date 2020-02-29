const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index', { title: '/shelf' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/shelfcallback', passport.authenticate(
  'google',
  {
    // THESE PATHS BELOW MAY BE INCORRECT. CHECK HERE IF ISSUES!
    successRedirect : '/users',
    failureRedirect : '/users'
  }
));

router.get('/logout', (req, res) => {
  req.logout();
  // ASK BEN ABOUT THESE ROUTES.  CAN THEY BE SET TO ANY LANDING PAGE?
  res.redirect('/users');
});

module.exports = router;