const OrderCustomarsRepository = require('../repositories/orderCustomars.repository');

class orderCustomarsService {
  orderCustomarsRepository = new OrderCustomarsRepository();

  postOrder = async (storeId, menuorderId, userId) => {
    try {
      // 메뉴 테이블의 메뉴 포인트
      const menuPoints = await this.orderCustomarsRepository.getMenuPoint(
        userId,
        storeId
      );
      // 고객의 현재 포인트 조회
      const custoMeruserPoint = await this.orderCustomarsRepository.getPoint(
        userId
      );

      const transactionUpdate = await this.orderCustomarsRepository.updatepoint(
        custoMeruserPoint,
        menuPoints,
        userId,
        storeId
      );
      const order = await this.orderCustomarsRepository.postOrder();
      const ordercustomerId = order.ordercustomerId;

      await this.orderCustomarsRepository.putOrdercustomerId(
        menuorderId,
        ordercustomerId
      );

      return {
        status: 200,
        message: '주문이 완료되었습니다',
      };
    } catch (error) {
      return {
        status: 500,
        message: '고객님의 point를 차감하는 도중 문제가 생겼습니다 ',
      };
    }
  };
  getOrder = async (storeId, ordercustomarId) => {
    try {
      const orders = await this.orderCustomarsRepository.getOrder(
        ordercustomarId
      );
      return {
        status: 200,
        message: orders,
      };
    } catch (error) {
      return {
        status: 400,
        message: '장바구니 내역을 가져오지 못했습니다',
      };
    }
  };

  //사장이 주문 완료
  updateState = async (storeId, ordercustomerId, userId, menuId) => {
    try {
      const findOne = await this.orderCustomarsRepository.findState(
        ordercustomerId
      );
      const getStatus = findOne.state;

      if (getStatus === 1) {
        return {
          status: 405,
          message: '이미 배달이 완료되었습니다',
        };
      }
      const update = await this.orderCustomarsRepository.updateOrder(
        ordercustomerId
      );
      return {
        status: 200,
        message: '배달이 완료되었습니다',
      };
    } catch (error) {
      return {
        status: 400,
        message: '배달 완료가 비정상적으로 종료되었습니다',
      };
    }
  };
}

module.exports = orderCustomarsService;
