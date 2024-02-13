const User = require('../models/user')
const axios = require('axios')

module.exports = {
  index,
  show,
  showSearch,
  apiSearch,
  delete: deleteBook,
  addBook,
  rateBook
}

function index(req, res) {
  res.render('books/index')
}

function show(req, res) {
  User.findById(req.user._id, (err, user) => {
    let book = user.books.id(req.params.id)
    res.render('books/show', {
      book
    })
  })
}

function showSearch(req, res) {
  res.render('books/search', {
    results: null,
    bookImage: null
  })
}

function apiSearch(req, res) {
  let query = req.body.query
  let bookImage
  let isbn
  axios
    .get(`http://openlibrary.org/search.json?title=${query}`)
    .then((response) => {
      let results = response.data
      let isbn = response.data.docs[0].isbn[0]
      return axios
        .get(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`
        )
        .then((response) => {
          let keys = Object.keys(response.data)
          let key = keys[0]
          let bookImage = response.data
          res.render('books/search', {
            results: results,
            bookImage: bookImage
          })
        })
    })
    .catch((error) => {
      console.log(error)
    })
}

function deleteBook(req, res) {
  User.findById(req.user._id, (err, user) => {
    user.books.splice(req.params.id, 1)
    user.save((err) => {
      res.redirect('/books/index')
    })
  })
}

function addBook(req, res) {
  User.findById(req.user._id, (err, user) => {
    user.books.push(req.body)
    user.save((err) => {
      res.redirect('/books/index')
    })
  })
}

function rateBook(req, res) {
  User.findById(req.user._id, (err, user) => {
    let book = user.books.id(req.params.id)
    book.rating = req.body
    user.save((err) => {
      if (err) console.log(err)
      res.redirect(`/books/${book._id}`)
    })
  })
}
