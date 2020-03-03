const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/index', booksCtrl.index);
router.get('/new', booksCtrl.new);
router.get('/search', booksCtrl.showSearch);
router.post('/search/api', booksCtrl.apiSearch);
router.post('/add', booksCtrl.addBook);
router.get('/:id', booksCtrl.show);
router.delete('/:id', booksCtrl.delete);

router.post('/', booksCtrl.create);

module.exports = router;