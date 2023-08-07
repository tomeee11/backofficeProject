const { Users, Reviews, Stores } = require('../models');

class ReviewRepository {
  // 전체 리뷰 조회
  findAllReview = async storeId => {
    const reviews = await Reviews.findAll({
      where: { storeId },
      include: [
        {
          model: Users,
          attributes: ['nickname'],
          as: 'User',
        },
      ],
      order: [['createdAt', 'desc']],
    });

    return reviews;
  };

  // 가게 존재 여부를 위해 storeId 기준으로 조회
  findStoreId = async storeId => {
    const store = await Stores.findOne({ where: { storeId } });
    return store;
  };

  // review 존재 여부를 위해 reviewId 기준으로 조회
  findReviewId = async reviewId => {
    const review = await Reviews.findOne({ where: { reviewId } });
    return review;
  };

  // 리뷰 작성
  createReview = async (userId, storeId, comment, star) => {
    await Reviews.create({
      UserId: userId,
      StoreId: storeId,
      comment,
      star,
    });
  };

  // 리뷰 수정
  updateReview = async (reviewId, updateReview) => {
    await Reviews.update(updateReview, { where: { reviewId } });
  };

  // 리뷰 삭제
  deleteReview = async reviewId => {
    await Reviews.destroy({ where: { reviewId } });
  };
}

module.exports = ReviewRepository;
