const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/index', booksCtrl.index);

module.exports = router;