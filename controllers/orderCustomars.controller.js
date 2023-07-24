const OrdersCustomerService = require('../services/orderCustomars.service');
const { Transaction } = require('sequelize');

class orderCustomarsController {
  ordersCustomerService = new OrdersCustomerService();

  // 손님이 주문 완료
  postOrder = async (req, res, next) => {
    const { storeId, menuorderId } = req.params;
    const { userId } = res.locals.user;

    //잔여 포인트가 토탈 포인트보다 많을때만 주문 가능

    const { status, message } = await this.ordersCustomerService.postOrder(
      storeId,
      menuorderId,
      userId
    );
    res.status(status).json({ message });
  };

  getOrder = async (req, res, next) => {
    const { storeId, ordercustomerId } = req.params;
    // const { userId } = res.locals.user;

    const { status, message } = await this.ordersCustomerService.getOrder(
      storeId,
      ordercustomerId
    );

    res.status(status).json({ message });
  };

  //사장이 배달 완료
  updateState = async (req, res, next) => {
    const { storeId, ordercustomerId } = req.params;
    // const { userId } = res.locals.user;

    const { status, message } = await this.ordersCustomerService.updateState(
      storeId,
      ordercustomerId
    );
    res.status(status).json({ message });
  };
}

module.exports = orderCustomarsController;
