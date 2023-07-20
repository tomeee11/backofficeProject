const {
  OrderCustomers,
  menuOrderCustomers,
  Menus,
  Users,
} = require('../models');

class orderCustomarsRepository {
  getPoint = async userId => {
    const point = await Users.findOne({
      where: { userId },
    });
    return point;
  };

  getTotalPoint = async () => {
    const totalPoint = await menuOrderCustomers.findAll({
      include: [
        {
          model: Menus,
          // where: { MenuId: menuId },
          // attributes: ['menuPoint'],
          as: 'Menu',
        },
      ],
    });

    //근데 생각해보니까 그 메뉴가 몇개 주문됐는지도 확인해야함 ^^
    return totalPoint;
  };

  postOrder = async () => {
    const order = await OrderCustomers.create();
    return order;
  };
  // MenuCostomerOrder 의 OrdercustomerId 를 고쳐줘야함
  putOrdercustomerId = async (menuorderId, ordercustomerId) => {
    const a = await menuOrderCustomers.update(
      { OrdercustomerId: ordercustomerId },
      { where: { menuorderId } }
    );
    return a;
  };

  getOrder = async ordercustomerId => {
    const orders = await OrderCustomers.findAll({ where: { ordercustomerId } });
    return orders;
  };
  findState = async ordercustomerId => {
    const state = await OrderCustomers.findOne({
      where: { ordercustomerId },
    });
    return state;
  };
  // 손님이 주문 버튼 누를때
  updateOrder = async ordercustomerId => {
    const updateorder = await OrderCustomers.update(
      {
        state: 1,
      },
      { where: { ordercustomerId } }
    );
    return updateorder;
  };
}

module.exports = orderCustomarsRepository;
