// 여기서 에러핸들링 처리
const { ServiceQuotas } = require('aws-sdk');
const CustomerOrderRepository = require('../repositories/menuOrderCustomers.repository');

class CustomerOrderService {
  customerOrderRepository = new CustomerOrderRepository();

  getOrderUser = async (userId, storeId, menuId) => {
    try {
      const orders = await this.customerOrderRepository.userAll(
        userId,
        storeId,
        menuId
      );

      if (orders.length === 0) {
        return {
          status: 400,
          message: '장바구니가 비어있습니다.',
        };
      }

      const order = orders.map(item => {
        return {
          UserId: item.Menu.UserId,
          StoreId: item.Menu.StoreId,
          menuorderId: item.menuorderId,
          MenuId: item.MenuId,
          OrdercustomerId: item.OrdercustomerId,
          amount: item.amount,
          menuImage: item.Menu.menuImage,
          menuName: item.Menu.menuName,
          menuPoint: item.Menu.menuPoint,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return {
        status: 201,
        message: order,
      };
    } catch (error) {
      return {
        status: 400,
        message: '장바구니 조회에 실패했습니다.',
      };
    }
  };

  // 장바구니 담기
  postorder = async (userId, storeId, menuId) => {
    try {
      // menuId 값으로 메뉴 존재 유무 조회
      const menu = await this.customerOrderRepository.getMenu(menuId);

      if (!menu) {
        return {
          status: 400,
          message: '존재하지 않는 메뉴 입니다.',
        };
      }

      await this.customerOrderRepository.createorder(userId, storeId, menuId);
      return {
        status: 200,
        message: '장바구니에 담겼습니다.',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '장바구니에 담는 도중 오류가 발생하였습니다.',
      };
    }
  };

  // 장바구니 삭제
  deleteorder = async (storeId, menuId, menuorderId) => {
    // 가게 유무 조회
    const store = await this.customerOrderRepository.findStore(storeId);

    if (!store) {
      return {
        status: 400,
        message: '존재하지 않는 가게 입니다.',
      };
    }

    await this.customerOrderRepository.destroyorder(menuId, menuorderId);
    return {
      status: 202,
      message: '장바구니에서 삭제되었습니다.',
    };
  };

  // 장바구니 메뉴 갯수 추가, 감소
  signAmount = async (menuId, menuorderId, sign, userId) => {
    try {
      const getAmount = await this.customerOrderRepository.getAmount(
        menuId,
        menuorderId,
        sign
      );
      const amount = getAmount.amount;

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

      return {
        status: 201,
        message: '장바구니 수량이 변경되었습니다.',
      };
    } catch (error) {
      return {
        status: 400,
        message: '장바구니가 비어있습니다.',
      };
    }
  };
}
module.exports = CustomerOrderService;
