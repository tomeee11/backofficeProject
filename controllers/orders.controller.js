const OrdersService = require('../services/orders.service');

class OrdersController {
  OrdersService = new OrdersService();

  getStatus = async (req, res, next) => {
    const { totalpoint } = req.body;
    const { userId } = res.locals.user;
    const { storeId, orderId } = req.params;

    const { status, message, orders } = await this.OrdersService.getStatus(
      userId,
      storeId,
      orderId,
      totalpoint
    );
    res.status(status).json({ message, orders });
  };

  updateStatus = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { storeId, orderId } = req.params;

    const { status, message } = await this.OrdersService.updateStatus(
      userId,
      storeId,
      orderId
    );
    res.status(status).json({ message });
  };
}

module.exports = OrdersController;
