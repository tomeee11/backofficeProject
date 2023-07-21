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
    let total;

    const totalPoint = await menuOrderCustomers.findAll({});

    //잔여 포인트가 토탈 포인트보다 많을때만 주문 가능 이거 일어나서 구현하기(if)
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
