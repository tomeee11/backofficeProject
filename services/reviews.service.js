const ReviewRepository = require('../repositories/reviews.repository');

class ReviewService {
  reviewRepository = new ReviewRepository();

  // 리뷰 전체 조회
  findAllReview = async () => {
    try {
      const allReview = await this.reviewRepository.findAllReview();

      const allReviews = allReview.map(reviews => {
        return {
          reviewId: reviews.reviewId,
          UserId: reviews.UserId,
          StoreId: reviews.StoreId,
          nickname: reviews.User.nickname,
          comment: reviews.comment,
          star: reviews.star,
          createdAt: reviews.createdAt,
          updatedAt: reviews.updatedAt,
        };
      });

      if (allReview.length === 0) {
        return {
          status: 400,
          message: '리뷰가 존재하지 않습니다.',
        };
      }

      return {
        status: 200,
        message: '모든 리뷰가 조회되었습니다!',
        allReviews,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '모든 리뷰 조회 중 오류가 발생하였습니다.',
      };
    }
  };

  // 리뷰 작성
  createReview = async (userId, storeId, comment, star) => {
    try {
      if (!comment) {
        return {
          status: 400,
          message: '리뷰 내용을 입력해주세요.',
        };
      }
      if (!star) {
        return {
          status: 400,
          message: '별점을 남겨주세요.',
        };
      }

      const createReviewData = await this.reviewRepository.createReview(
        userId,
        storeId,
        comment,
        star
      );

      return {
        status: 200,
        message: '리뷰 작성에 성공하였습니다!',
        createReviewData,
      };
    } catch (error) {
      return {
        status: 400,
        message: '리뷰 작성에 실패하였습니다.',
      };
    }
  };

  // 리뷰 수정
  updateReview = async (storeId, reviewId, userId, comment, star) => {
    try {
      // storeId로 가게 존재 유무 조회
      const store = await this.reviewRepository.findStoreId(storeId);
      // reviewId로 리뷰 존재 유무 조회
      const review = await this.reviewRepository.findReviewId(reviewId);

      if (!store) {
        return {
          status: 400,
          message: '가게를 찾을 수 없습니다.',
        };
      }
      if (!review) {
        return {
          status: 400,
          message: '리뷰를 찾을 수 없습니다.',
        };
      }
      if (review.UserId !== userId) {
        return {
          status: 400,
          message: '접근이 허용되지 않습니다.',
        };
      }
      if (!comment) {
        return {
          status: 400,
          message: '내용을 입력해주세요.',
        };
      }
      if (!star) {
        return {
          status: 400,
          message: '별점을 남겨주세요.',
        };
      }

      const updateReview = {};

      if (comment) {
        updateReview.comment = comment;
      }
      if (star) {
        updateReview.star = star;
      }

      await this.reviewRepository.updateReview(reviewId, updateReview);
      return {
        status: 200,
        message: '리뷰 수정에 성공하였습니다!',
      };
    } catch (error) {
      return {
        status: 400,
        message: '리뷰 수정에 실패하였습니다.',
      };
    }
  };

  // 리뷰 삭제
  deleteReview = async (storeId, reviewId, userId) => {
    try {
      // storeId로 가게 존재 유무 조회
      const store = await this.reviewRepository.findStoreId(storeId);
      // reviewId로 리뷰 존재 유무 조회
      const review = await this.reviewRepository.findReviewId(reviewId);

      if (!store) {
        return {
          status: 400,
          message: '게시물을 찾을 수 없습니다.',
        };
      }
      if (!review) {
        return {
          status: 400,
          message: '리뷰를 찾을 수 없습니다.',
        };
      }
      if (review.UserId !== userId) {
        return {
          status: 400,
          message: '접근이 허용되지 않습니다.',
        };
      }

      await this.reviewRepository.deleteReview(reviewId);
      return {
        status: 200,
        message: '리뷰 삭제에 성공하였습니다!',
      };
    } catch (error) {
      return {
        status: 400,
        message: '리뷰 삭제에 실패하였습니다.',
      };
    }
  };
}

module.exports = ReviewService;
