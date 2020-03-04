const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/index', booksCtrl.index);
router.get('/search', booksCtrl.showSearch);
router.post('/search/api', booksCtrl.apiSearch);
router.post('/add', booksCtrl.addBook);
router.delete('/:idx', booksCtrl.delete);
router.get('/:idx', booksCtrl.show);

module.exports = router;