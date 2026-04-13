const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { reviewController } = require('../controllers');

// middleware that is specific to this router

router.get('/', reviewController.getLatestReviews);

module.exports = router