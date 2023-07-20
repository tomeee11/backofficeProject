const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const ReviewController = require('../controllers/reviews.controller');
const reviewController = new ReviewController();

// 리뷰 조회
router.get('/store/reviews', reviewController.AllReview);
// 리뷰 작성
router.post(
  '/store/:storeId/review',
  authMiddleware,
  reviewController.createReview
);
// 리뷰 수정
router.patch(
  '/store/:storeId/review/:reviewId',
  authMiddleware,
  reviewController.updateReview
);
// 리뷰 삭제
router.delete(
  '/store/:storeId/review/:reviewId',
  authMiddleware,
  reviewController.deleteReview
);

module.exports = router;
