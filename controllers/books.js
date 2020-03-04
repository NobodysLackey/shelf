const User = require('../models/user');
const axios = require('axios');

module.exports = {
  index,
  show,
  showSearch,
  apiSearch
};

function index(req, res) {
  res.render('books/index');
};

function show (req, res) {
  Book.findById (req.params.id, (err, book) => {
    res.render('books/show', {book});
  });
};

function showSearch (req, res) {
  res.render('books/search', {
    results : null,
    bookImage: null
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
    return axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`)
    .then( response => {
      let keys = Object.keys(response.data);
      let key = keys[0];
      // console.log(key);
      let bookImage = response.data;
      // console.log('Book Image:' + bookImage);
      res.render('books/search', {
        results: results,
        bookImage: bookImage
      })
    })
  })
  .catch(error => {
    console.log(error);
  })
};