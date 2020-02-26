const Shelf = require("../models/shelf");

module.exports = {
  index
};

function index(req, res) {
  Shelf.find({}, (err, shelves) => {
    if (err) return next(err);
    res.render("shelves/index", { shelves });
  });
};