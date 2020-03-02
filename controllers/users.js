const User = require('../models/user');

module.exports = {
  index
};

function index(req, res) {
  console.log(req.user);
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('index', { 
        users,
        user: req.user });
  });
};