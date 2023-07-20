const MenuOrderCustomersService = require('../services/menuOrderCustomers.service');

class MenuOrderCustomersController {
  customerOrderService = new MenuOrderCustomersService();

  getorder = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { status, message, orders } =
      await this.customerOrderService.getorder(userId);
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
      userId,
      storeId,
      menuId,
      menuorderId
    );
    res.status(status).json({ message });
  };

  plusAmount = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { menuId, menuorderId } = req.body;
    const { status, message } = await this.customerOrderService.plusAmount(
      menuId,
      menuorderId,
      userId
    );
    res.status(status).json({ message });
  };

  minusAmount = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { menuId, menuorderId } = req.body;
    const { status, message } = await this.customerOrderService.minusAmount(
      menuId,
      menuorderId,
      userId
    );
    res.status(status).json({ message });
  };
}

module.exports = MenuOrderCustomersController;
