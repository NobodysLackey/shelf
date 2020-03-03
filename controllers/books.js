const User = require('../models/user');
const axios = require('axios');
const parseString = require('xml2js').parseString;

module.exports = {
  index,
  new: newBook,
  create,
  show,
  delete: deleteOne,
  showSearch,
  apiSearch,
  addBook
};

function index(req, res) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('books/index');
    });
};

function newBook (req, res) {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('books/new', {
      users,
      user: req.user });
    });
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('books/index', {
      books,
      book: req.read });
    });
};

function create (req, res) {
  let book = new Book(req.body);
  book.save((err) => {
      if (err) return res.render('books/new');
      res.redirect('/books');
  });
};

function show (req, res) {
  Book.findById (req.params.id, (err, book) => {
    res.render('books/show', {book});
  });
};

function deleteOne (req, res) {
  Book.findByIdAndDelete (req.params.id, (err, books) => {
    res.redirect('/books');
  });
};

function showSearch (req, res) {
  res.render('books/search', {
    user: req.user,
    results : null
   });
};

function apiSearch (req, res) {
  let query = req.body.query;
  let bookImage;
  let isbn;
  axios.get(`http://openlibrary.org/search.json?title=${query}`)
  .then( response => {
    let results = response.data;
    let isbn = response.data.docs[0].isbn[0];
    console.log('ISBN:' + isbn);
    return axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}`)
    .then( response => {
      let bookImage = response.data;
      console.log('Book Image:' + bookImage);
      res.render('books/search', {
        user: req.user,
        results: results,
        bookImage: bookImage
      })
    })
  })
  .catch(error => {
    console.log(error);
  })
};

function addBook (req, res) {
  User.findById(req.user._id, (err, user) => {
    user.books.push(req.body);
    user.save( (err) => {
      res.redirect('/')
    })
  })
};