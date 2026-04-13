const { bookModel } = require('../models');
const { newReview } = require('./reviewController');

function getBooks(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    bookModel.find()
        .populate('owner')
        .limit(limit)
        .then(books => res.json(books))
        .catch(next);
}

function getBook(req, res, next) {
    const { bookId } = req.params;

    bookModel.findById(bookId)
        .populate({
            path: 'reviews',
            populate: {
                path: 'userId'
            }
        })
        .then(book => res.json(book))
        .catch(next);
}

function createBook(req, res, next) {
    const {
        title,
        author,
        totalPage,
        publisher,
        publishYear,
        category,
        language,
        century,
        reviewText
    } = req.body;

    const { _id: userId } = req.user;

    bookModel.create({
        title,
        author,
        totalPage,
        publisher,
        publishYear,
        category,
        language,
        century,
        owner: userId,
        favourites: [userId]
    })
        .then(book => {
            if (reviewText) {
                newReview(reviewText, userId, book._id)
                    .then(([_, updatedBook]) => res.status(200).json(updatedBook))
            } else {
                res.status(200).json(book);
            }
        })
        .catch(next);
}

//likes
function favourite(req, res, next) {
    const { bookId } = req.params;
    const { _id: userId } = req.user;

    bookModel.findByIdAndUpdate(
        bookId,
        { $addToSet: { favourites: userId } },
        { new: true }
    )
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(next);
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    favourite,
};