const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    ownerId: {
        type: ObjectId,
        ref: "User",
        required: true
    },

    bookId: {
        type: ObjectId,
        ref: "Book",
        required: true
    }

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Review', reviewSchema);