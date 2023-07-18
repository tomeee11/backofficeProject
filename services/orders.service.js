const OrdersRepository = require('../repositories/orders.repository');

class OrdersService {
  ordersRepository = new OrdersRepository();

  getStatus = async (userId, storeId, orderId, totalpoint) => {
    try {
      const allOrder = await this.ordersRepository.getStatus(storeId, orderId);
      if (!totalpoint) {
        return {
          status: 400,
          message: '어떤 메뉴도 주문하지 않았습니다.',
        };
      }
      const order = await this.ordersRepository.findUserId(storeId);
      if (userId !== order.UserId) {
        return {
          status: 401,
          message: '주문을 확인할 권한이 없습니다',
        };
      }
      const orders = allOrder.map(a => {
        return {
          UserId: a.UserId,
          MenuId: a.MenuId,
          status: a.status,
          totalpoint: a.totalpoint,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
        };
      });
      return {
        status: 200,
        message: '모든 주문이 조회되었습니다',
        orders,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '주문 조회에 실패하였습니다',
      };
    }
  };

  updateStatus = async (userId, storeId, orderId) => {
    try {
      const order = await this.ordersRepository.findUserId(storeId);
      if (userId !== order.UserId) {
        return {
          status: 401,
          message: '주문을 변경할 권한이 없습니다',
        };
      }

      await this.ordersRepository.updateStatus(orderId);
      return {
        status: 200,
        message: '배달이 완료 되었습니다',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '배달완료 과정이 비정상적으로 종료되었습니다',
      };
    }
  };
}

module.exports = OrdersService;
