const Book = require('../models/book');

module.exports = {
  index
};

function index(req, res) {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('books/index', { books });
  });
};