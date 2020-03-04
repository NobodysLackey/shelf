const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema ({
    rating: {
        type: String,
        enum: [1, 2, 3, 4, 5]
    }
}, {
    timestamps: true
});

const bookSchema = new Schema ({
    title: String,
    author: String,
    publishYear: String,
    rating: [ratingSchema]
}, {
    timestamps: true
});

const userSchema = new Schema ({
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    books: [bookSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);