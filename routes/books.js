const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const passport = require('passport');


router.get('/index', isLoggedIn, booksCtrl.index);
router.get('/search', booksCtrl.showSearch);

router.post('/search/api', booksCtrl.apiSearch);
router.post('/add', isLoggedIn, booksCtrl.addBook);
router.post('/:id/rating', isLoggedIn, booksCtrl.rateBook);

router.delete('/:id', isLoggedIn, booksCtrl.delete);

router.get('/:id', isLoggedIn, booksCtrl.show);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.render('login');
};

module.exports = router;