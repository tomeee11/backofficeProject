const { Users, Reviews, Stores } = require('../models');

class ReviewRepository {
  // 전체 리뷰 조회
  findAllReview = async () => {
    const reviews = await Reviews.findAll({
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      order: [['createdAt', 'desc']],
    });

    return reviews;
  };

  // 상세 리뷰 조회
  //   findOneReview = async (storeId, reviewId) => {
  //     const review = await Reviews.findOne({
  //       where: { storeId },
  //       include: [
  //         {
  //           model: Users,
  //           attributes: ['nickname'],
  //         },
  //       ],
  //     });

  //   return review;
  // };

  // store 존재 여부를 위해 storeId 기준으로 조회
  //   findStoreId = async storeId => {
  //     const store = await Stores.findOne({ where: { storeId } });
  //     return store;
  //   };

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
