const { bookModel, userModel, reviewModel } = require('../models');
const { newReview } = require('./reviewController');
const mongoose = require('mongoose');

/*
function getBooks(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    bookModel.find()
        .populate('owner')
        .limit(limit)
        .then(books => res.json(books))
        .catch(next);
*/

function getBooks(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    bookModel.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "bookId",
                as: "reviews"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "ownerId",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $addFields: {
                reviewsCount: { $size: "$reviews" },
                averageRating: {
                    $cond: [
                        { $eq: [{ $size: "$reviews" }, 0] },
                        0,
                        { $avg: "$reviews.rating" }
                    ]
                }
            }
        },
        {
            $unwind: {
                path: "$owner",
                preserveNullAndEmptyArrays: true
            }
        },

        // 📏 limit (IMPORTANT: after calculations is fine for small apps)
        ...(limit ? [{ $limit: limit }] : [])
    ])
        .then(books => res.json(books))
        .catch(next);
}

/*
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
*/

function getBook(req, res, next) {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid bookId" });
    }

    const id = new mongoose.Types.ObjectId(bookId);

    bookModel.aggregate([
        {
            $match: { _id: id }
        },
        {
            $lookup: {
                from: "users",
                localField: "ownerId",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $unwind: "$owner"
        },
        // REVIEWS
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "bookId",
                as: "reviews"
            }
        },

        // OWNER for review (nested lookup)
        {
            $lookup: {
                from: "users",
                localField: "reviews.ownerId",
                foreignField: "_id",
                as: "reviewOwners"
            }
        },

        // connect review + owner
        {
            $addFields: {
                reviews: {
                    $map: {
                        input: "$reviews",
                        as: "review",
                        in: {
                            _id: "$$review._id",
                            text: "$$review.text",
                            rating: "$$review.rating",
                            created_at: "$$review.created_at",

                            // owner for all review
                            owner: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$reviewOwners",
                                            as: "u",
                                            cond: { $eq: ["$$u._id", "$$review.ownerId"] }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            }
        },

        // rating + count
        {
            $addFields: {
                reviewsCount: { $size: "$reviews" },
                averageRating: {
                    $cond: [
                        { $eq: [{ $size: "$reviews" }, 0] },
                        0,
                        { $avg: "$reviews.rating" }
                    ]
                }
            }
        },

        // clean helper array
        {
            $project: {
                reviewOwners: 0
            }
        }
    ])
        .then(book => res.json(book[0] || null))
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
        country,
        reviewText,
        description,
        imageUrl
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
        description,
        country,
        ownerId: userId,
        favourites: [],
        imageUrl
    })
    .then(book => {

        return userModel.findByIdAndUpdate(
            userId,
            { $push: { books: book._id } },
            { new: true }
        )
        .then(() => book);
    })
    .then(book => {

        if (reviewText) {
            return newReview(reviewText, userId, book._id)
                .then(([_, updatedBook]) => res.status(200).json(updatedBook));
        }

        res.status(200).json(book);
    })
    .catch(next);
}

function deleteBook(req, res, next) {
    const { bookId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        // delete book (if owner is that user)
        bookModel.findOneAndDelete({
            _id: bookId,
            ownerId: userId
        }),

        // remove the book book from user.books
        userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { books: bookId } }
        ),

        // remove all reviews from this book
        reviewModel.deleteMany({ bookId })
    ])
        .then(([deletedBook]) => {
            if (deletedBook) {
                res.status(200).json(deletedBook);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

function editBook(req, res, next) {
    const { bookId } = req.params;
    const { _id: userId } = req.user;

    const {
        title,
        author,
        totalPage,
        publisher,
        publishYear,
        category,
        language,
        country,
        description,
        imageUrl
    } = req.body;

    bookModel.findOneAndUpdate(
        { _id: bookId, ownerId: userId },
        {
            title,
            author,
            totalPage,
            publisher,
            publishYear,
            category,
            language,
            country,
            description,
            imageUrl
        },
        { new: true, runValidators: true }
    )
        .then(updatedBook => {
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(403).json({ message: 'Not allowed!' });
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
    deleteBook,
    editBook,
    favourite,
};