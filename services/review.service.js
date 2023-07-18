const ReviewRepository = require('../repositories/review.repository');

class ReviewService {
  reviewRepository = new ReviewRepository();

  // 리뷰 전체 조회
  findAllReview = async () => {
    const allReview = await this.reviewRepository.findAllReview();

    return allReview.map(reviews => {
      return {
        reviewId: reviews.reviewId,
        UserId: reviews.UserId,
        StoreId: reviews.StoreId,
        nickname: reviews.Users.nickname,
        comment: reviews.comment,
        star: reviews.star,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,
      };
    });
  };

  // 리뷰 상세 조회
  //   fineOneReview = async (storeId, reviewId) => {
  //     const review = await this.reviewRepository.findOneReview(storeId, reviewId);

  //     return {
  //       reviewId: review.reviewId,
  //       UserId: review.UserId,
  //       StoreId: review.StoreId,
  //       nickname: review.Users.nickname,
  //       comment: review.comment,
  //       star: review.star,
  //       createdAt: review.createdAt,
  //       updatedAt: review.updatedAt,
  //     };
  //   };

  // 리뷰 작성
  createReview = async (userId, comment, star) => {
    const createReviewData = await this.reviewRepository.createReview(
      userId,
      comment,
      star
    );

    return createReviewData;
  };

  // store 존재 여부를 위해 storeId 기준으로 조회
  //   findStoreId = async storeId => {
  //     const findStoreId = this.reviewRepository.findStoreId(storeId);
  //     return findStoreId;
  //   };

  // 리뷰 수정
  updateReview = async (reviewId, comment, star) => {
    const updateReview = {};

    if (comment) {
      updateReview.comment = comment;
    }
    if (star) {
      updateReview.star = star;
    }

    const newReview = await this.reviewRepository.updateReview(
      reviewId,
      updateReview
    );
    return newReview;
  };

  // 리뷰 삭제
  deleteReview = async reviewId => {
    await this.reviewRepository.deleteReview(reviewId);
  };
}

module.exports = ReviewService;
