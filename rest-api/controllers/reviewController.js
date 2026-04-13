const { userModel, bookModel, reviewModel } = require('../models');

// create
function newReview(text, rating, userId, bookId) {
    return reviewModel.create({ text, rating, owner: userId, bookId })
        .then(review => {
            return Promise.all([
                // add review to user
                userModel.updateOne(
                    { _id: userId },
                    { $push: { reviews: review._id } }
                ),

                // add review to book
                bookModel.findByIdAndUpdate(
                    bookId,
                    { $push: { reviews: review._id } },
                    { new: true }
                )
            ]);
        });
}

// last reviews
function getLatestReviews(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    reviewModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('bookId owner')
        .then(reviews => res.status(200).json(reviews))
        .catch(next);
}

// create endpoint
function createReview(req, res, next) {
    const { bookId } = req.params;
    const { _id: userId } = req.user;
    const { text, rating } = req.body;

    newReview(text, rating, userId, bookId)
        .then(([_, updatedBook]) => res.status(200).json(updatedBook))
        .catch(next);
}

// edit
function editReview(req, res, next) {
    const { reviewId } = req.params;
    const { text, rating } = req.body;
    const { _id: userId } = req.user;

    reviewModel.findOneAndUpdate(
        { _id: reviewId, owner: userId },
        { text, rating },
        { new: true }
    )
        .then(updatedReview => {
            if (updatedReview) {
                res.status(200).json(updatedReview);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}


function deleteReview(req, res, next) {
    const { reviewId, bookId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        reviewModel.findOneAndDelete({ _id: reviewId, owner: userId }),

        userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { reviews: reviewId } }
        ),

        bookModel.findOneAndUpdate(
            { _id: bookId },
            { $pull: { reviews: reviewId } }
        ),
    ])
        .then(([deletedReview]) => {
            if (deletedReview) {
                res.status(200).json(deletedReview);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

// Like  review
function like(req, res, next) {
    const { reviewId } = req.params;
    const { _id: userId } = req.user;

    reviewModel.updateOne(
        { _id: reviewId },
        { $addToSet: { likes: userId } }
    )
        .then(() => res.status(200).json({ message: 'Liked successfully!' }))
        .catch(next);
}

module.exports = {
    getLatestReviews,
    newReview,
    createReview,
    editReview,
    deleteReview,
    like,
};