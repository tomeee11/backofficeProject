const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/review.controller');
const reviewController = new ReviewController();

router.get('/store/customer', reviewController.AllReview);
router.get(
  '/store/customer/:storeId/review/:reviewId',
  reviewController.oneReview
);
router.post('/store/customer/:storeId', reviewController.createReview);
router.patch(
  '/store/customer/:storeId/review/:reviewId',
  reviewController.updateReview
);
router.delete(
  '/store/customer/:storeId/review/:reviewId',
  reviewController.deleteReview
);

module.exports = router;
