const { OrderCustomers, menuOrderCustomers, Menus } = require('../models');

class orderCustomarsRepository {
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
