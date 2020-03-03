const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: String,
    author: String,
    cover: String,
    length: Number,
    read: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);