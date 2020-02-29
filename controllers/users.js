const User = require('../models/user');

module.exports = {
  index
};

function index(req, res, next) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
};