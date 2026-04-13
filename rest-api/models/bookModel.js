const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    totalPage: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    ownerId: {
        type: ObjectId,
        ref: "User"
    },
    favourites: {
        type: [ObjectId],
        ref: "User",
        default: []
    },
    reviews: {
        type: [ObjectId],
        ref: "Review",
        default: []
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Book', bookSchema);
