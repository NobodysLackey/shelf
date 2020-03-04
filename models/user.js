const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: String,
    author: String,
    publishYear: String,
}, {
    timestamps: true
});

const userSchema = new Schema ({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    books: [bookSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);