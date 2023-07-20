const MenuOrderCustomersService = require('../services/menuOrderCustomers.service');

class MenuOrderCustomersController {
  customerOrderService = new MenuOrderCustomersService();

  getorder = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { status, message, orders } =
      await this.customerOrderService.getorder(userId);
    res.status(status).json({ message, orders });
  };

  getOrderUser = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { storeId } = req.params;
    const { status, message, orders } =
      await this.customerOrderService.getOrderUser(userId, storeId);
    res.status(status).json({ message, orders });
  };

  postorder = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { storeId } = req.params;
    const { menuId } = req.body;

    const { status, message } = await this.customerOrderService.postorder(
      userId,
      storeId,
      menuId
    );
    res.status(status).json({ message });
  };

  deleteorder = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { storeId } = req.params;
    const { menuId, menuorderId } = req.body;
    const { status, message } = await this.customerOrderService.deleteorder(
      menuId,
      menuorderId
    );
    res.status(status).json({ message });
  };

  signAmount = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { menuId, menuorderId, sign } = req.body;
    const { status, message } = await this.customerOrderService.signAmount(
      menuId,
      menuorderId,
      sign,
      userId
    );
    res.status(status).json({ message });
  };
}

module.exports = MenuOrderCustomersController;
