const OrderCustomarsRepository = require('../repositories/orderCustomars.repository');

class orderCustomarsService {
  orderCustomarsRepository = new OrderCustomarsRepository();

  postOrder = async (storeId, menuorderId, userId, menuId) => {
    try {
      //주문 하기 전에 잔여 포인트가 토탈 포인트보다 많은지 확인을 우선적으로 해줘야함
      //내 포인트
      const getPoint = await this.orderCustomarsRepository.getPoint(userId);
      //현재 장바구니 안에 들어가 있는 메뉴들의 총 가격
      const getTotalPoint = await this.orderCustomarsRepository.getTotalPoint();

      console.log('@@@@@@@@' + getTotalPoint);
      let totalPoint;
      getTotalPoint.map(a => {
        totalPoint += a.Menu.menuPoint;
      });
      console.log('@@@@' + totalPoint);

      if (getPoint.point < totalPoint) {
        return {
          status: 405,
          message: '잔액이 부족합니다',
        };
      }
      //후에 주문 완료
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
