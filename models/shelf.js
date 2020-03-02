const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelfSchema = new Schema ({
    title: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Shelf', shelfSchema);