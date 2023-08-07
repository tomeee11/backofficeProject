const ReviewService = require('../services/reviews.service');

class ReviewController {
  reviewService = new ReviewService();

  // 리뷰 전체 조회
  AllReview = async (req, res, next) => {
    const { storeId } = req.params;
    const { status, message, allReviews } =
      await this.reviewService.findAllReview(storeId);

    res.status(status).json({ message, allReviews });
  };

  // 리뷰 작성
  createReview = async (req, res, next) => {
    const { storeId } = req.params;
    const { userId } = res.locals.user;
    const { comment, star } = req.body;

    const { status, message } = await this.reviewService.createReview(
      userId,
      storeId,
      comment,
      star
    );

    res.status(status).json({ message });
  };

  // 리뷰 수정
  updateReview = async (req, res, next) => {
    const { storeId, reviewId } = req.params;
    const { userId } = res.locals.user;
    const { comment, star } = req.body;

    const { status, message } = await this.reviewService.updateReview(
      storeId,
      reviewId,
      userId,
      comment,
      star
    );
    res.status(status).json({ message });
  };

  // 리뷰 삭제
  deleteReview = async (req, res, next) => {
    const { storeId, reviewId } = req.params;
    const { userId } = res.locals.user;

    const { status, message } = await this.reviewService.deleteReview(
      storeId,
      reviewId,
      userId
    );
    res.status(status).json({ message });
  };
}

module.exports = ReviewController;
