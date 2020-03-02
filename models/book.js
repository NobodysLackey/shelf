const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: String,
    author: String,
    cover: String,
    length: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);