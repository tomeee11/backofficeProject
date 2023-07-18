const { Orders, Menus } = require('../models');

class OrdersRepository {
  // 모든 주문 확인
  // 프론트에서 주문된 menu의 status 의 상태를 변경해주는 방식
  getStatus = async () => {
    const orders = await Orders.findAll({
      include: [
        {
          model: Menus,
          attributes: ['menuId'],
        },
      ],
      order: [['createdAt', 'desc']],
    });

    return orders;
  };

  findUserId = async storeId => {
    const user = await Orders.findOne({ where: { StoreId: storeId } });
    return user;
  };

  updateStatus = async orderId => {
    await Reviews.update({ status: 1 }, { where: { orderId } });
  };
}

module.exports = OrdersRepository;
