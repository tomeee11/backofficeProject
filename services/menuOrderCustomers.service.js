// 여기서 에러핸들링 처리
const CustomerOrderRepository = require('../repositories/menuOrderCustomers.repository');

class CustomerOrderService {
  customerOrderRepository = new CustomerOrderRepository();

  postorder = async (userId, storeId, menuId) => {
    await this.customerOrderRepository.createorder(userId, storeId, menuId);
    return {
      status: 200,
      message: '테스트용',
    };
  };

  getorder = async (userId, storeId, menuId) => {
    const orders = await this.customerOrderRepository.findAll(
      userId,
      storeId,
      menuId
    );

    return {
      status: 201,
      message: orders,
    };
  };
  deleteorder = async (menuId, menuorderId) => {
    await this.customerOrderRepository.destroyorder(menuId, menuorderId);
    return {
      status: 202,
      message: '삭제 테스트',
    };
  };
  plusAmount = async (menuId, menuorderId, userId) => {
    try {
      const getAmount = await this.customerOrderRepository.getAmount(menuId);
      const amount = getAmount.amount;
      let plusA = 0;
      if (amount >= 10) {
        return { status: 400, message: '10개 이상은 주문이 불가능합니다.' };
      } else {
        plusA = amount + 1;
      }

      await this.customerOrderRepository.plusAmount(menuId, menuorderId, plusA);

      return {
        status: 201,
        message: '메뉴 주문 수량 +1',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '더하기가 비정상적으로 종료되었습니다',
      };
    }
  };

  minusAmount = async (menuId, menuorderId, userId) => {
    try {
      const getAmount = await this.customerOrderRepository.getAmount(menuId);
      const amount = getAmount.amount;
      let minusA = 0;
      if (amount <= 0) {
        return { status: 400, message: '이미 장바구니에서 제거 되었습니다' };
      } else {
        minusA = amount - 1;
      }

      await this.customerOrderRepository.minusAmount(
        menuId,
        menuorderId,
        minusA
      );

      return {
        status: 201,
        message: '메뉴 주문 수량 -1',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '빼기가 비정상적으로 종료되었습니다',
      };
    }
  };
}
module.exports = CustomerOrderService;
