const Book = require('../models/book');
const User = require('../models/user');

module.exports = {
  index
};

function index(req, res) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('books/index', { 
        users,
        user: req.user });
  });
};