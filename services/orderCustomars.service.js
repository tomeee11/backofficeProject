const OrderCustomarsRepository = require('../repositories/orderCustomars.repository');

class orderCustomarsService {
  orderCustomarsRepository = new OrderCustomarsRepository();

  postOrder = async (storeId, menuorderId) => {
    try {
      //role 완료되면 권한 에러 핸들링 해야함
      const order = await this.orderCustomarsRepository.postOrder();
      const ordercustomerId = order.ordercustomerId;
      const putOrdercustomerId =
        await this.orderCustomarsRepository.putOrdercustomerId(
          menuorderId,
          ordercustomerId
        );
      return {
        status: 200,
        message: '주문이 완료되었습니다',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '주문이 정상적으로 처리되지 않았습니다',
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
        message: '장바구니 내역을 가져왔습니다',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '장바구니 내역을 가져오지 못했습니다',
      };
    }
  };
  //사장이 주문 완료
  updateState = async (storeId, ordercustomerId) => {
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
      console.log(error);
      return {
        status: 400,
        message: '배달 완료가 비정상적으로 종료되었습니다',
      };
    }
  };
}

module.exports = orderCustomarsService;
