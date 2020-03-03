const Book = require('../models/book');
const User = require('../models/user');

module.exports = {
  index,
  new: newBook
};

function index(req, res) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('books/index', { 
        users,
        user: req.user });
    });
};

function newBook (req, res) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('books/new', {
      users,
      user: req.user });
    });
};