// 여기서 에러핸들링 처리
const { ServiceQuotas } = require('aws-sdk');
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
    console.log(menuId);
    await this.customerOrderRepository.destroyorder(menuId, menuorderId);
    return {
      status: 202,
      message: '삭제 테스트',
    };
  };

  signAmount = async (menuId, menuorderId, sign, userId) => {
    try {
      const getAmount = await this.customerOrderRepository.getAmount(
        menuId,
        menuorderId,
        sign
      );
      const amount = getAmount.amount;
      console.log(amount);
      let plusA = 0;
      if (sign === 'PLUS') {
        plusA = amount + 1;
        if (amount >= 10) {
          return {
            status: 400,
            message: '더 이상 주문할 수 없습니다.',
          };
        }
      }

      if (sign === 'MINUS') {
        plusA = amount - 1;

        if (amount <= 0) {
          return {
            status: 400,
            message: '장바구니가 비어있습니다.',
          };
        }
      }

      await this.customerOrderRepository.signAmount(menuId, menuorderId, plusA);
      console.log(plusA);

      return {
        status: 201,
        message: '장바구니 수량이 변경되었습니다.',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '장바구니가 비어있습니다.',
      };
    }
  };
}
module.exports = CustomerOrderService;
