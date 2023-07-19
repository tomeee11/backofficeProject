const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const ReviewController = require('../controllers/reviews.controller');
const reviewController = new ReviewController();

router.get('/store/reviews', reviewController.AllReview);
router.post(
  '/store/:storeId/review',
  authMiddleware,
  reviewController.createReview
);
router.patch(
  '/store/:storeId/review/:reviewId',
  authMiddleware,
  reviewController.updateReview
);
router.delete(
  '/store/:storeId/review/:reviewId',
  authMiddleware,
  reviewController.deleteReview
);

module.exports = router;
