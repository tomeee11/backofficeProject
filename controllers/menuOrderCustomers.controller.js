const MenuOrderCustomersService = require('../services/menuOrderCustomers.service');

class MenuOrderCustomersController {
  customerOrderService = new MenuOrderCustomersService();

  // 고객 본인 장바구니 조회
  getOrderUser = async (req, res, next) => {
    const { storeId } = req.params;
    const { userId } = res.locals.user;

    const { status, message, orders } =
      await this.customerOrderService.getOrderUser(userId, storeId);
    res.status(status).json({ message, orders });
  };

  // 장바구니 담기
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

  // 장바구니 삭제
  deleteorder = async (req, res, next) => {
    const { storeId } = req.params;
    const { menuId, menuorderId } = req.body;

    const { status, message } = await this.customerOrderService.deleteorder(
      storeId,
      menuId,
      menuorderId
    );
    res.status(status).json({ message });
  };

  // 장바구니 메뉴 갯수 추가, 감소
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
