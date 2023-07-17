const ReviewService = require('../services/review');

class ReviewController {
  reviewService = new ReviewService();

  // 리뷰 전체 조회
  AllReview = async (req, res, next) => {
    try {
      const reviews = await reviewService.findAllReview();

      res.status(200).json({ data: reviews });
    } catch (error) {
      res.status(400).json({ errorMessage: '리뷰가 존재하지 않습니다.' });
    }
  };

  // 리뷰 상세 조회
  //   oneReview = async (req, res, next) => {
  //     try {
  //       const { storeId, reviewId } = req.params;
  //       const review = await this.reviewService.fineOneReview(storeId, reviewId);

  //       res.status(200).json({ data: review });
  //     } catch (error) {
  //       res.status(400).json({ errorMessage: '해당 리뷰가 존재하지 않습니다.' });
  //     }
  //   };

  // 리뷰 작성
  createReview = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { comment, star } = req.body;

      if (!comment) {
        return res
          .status(400)
          .json({ errorMessage: '리뷰 내용을 입력해주세요.' });
      }
      if (!star) {
        return res.status(400).json({ errorMessage: '별점을 남겨주세요.' });
      }

      await this.reviewService.createReview(userId, comment, star);
      res.status(200).json({ message: '리뷰 작성에 성공하였습니다!' });
    } catch (error) {
      res.status(404).json({ errorMessage: '리뷰 작성에 실패하였습니다.' });
    }
  };

  // 리뷰 수정
  updateReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { comment, star } = req.body;
      const { userId } = res.locals.user;

      //   const store = await this.reviewService.findStoreId(storeId);

      //   if (!store) {
      //     return res
      //       .status(404)
      //       .json({ errorMessage: "게시물을 찾을 수 없습니다." });
      //   }
      //     if (store.UserId !== userId) {
      //         return res
      //       .status(400)
      //       .json({ errorMessage: "접근이 허용되지 않습니다." });
      //   }
      if (!comment) {
        return res.status(400).json({ errorMessage: '내용을 입력해주세요.' });
      }
      if (!star) {
        return res.status(400).json({ errorMessage: '별점을 남겨주세요.' });
      }

      await this.reviewService.updateReview(reviewId, comment, star);
      res.status(200).json({ message: '리뷰 수정에 성공하였습니다!' });
    } catch (error) {
      res.status(400).json({ errorMessage: '리뷰 수정에 실패하였습니다.' });
    }
  };

  // 리뷰 삭제
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { userId } = res.locals.user;

      //   const store = await this.reviewService.findStoreId(storeId);

      //   if (!store) {
      //     return res
      //       .status(404)
      //       .json({ errorMessage: "게시물을 찾을 수 없습니다." });
      //   }
      //     if (store.UserId !== userId) {
      //         return res
      //       .status(400)
      //       .json({ errorMessage: "접근이 허용되지 않습니다." });
      //   }

      await this.reviewService.deleteReview(reviewId);
      res.status(200).json({ message: '리뷰 삭제에 성공하였습니다!' });
    } catch (error) {
      res.status(400).json({ errorMessage: '리뷰 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = ReviewController;
