const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');
const OrdersCustomerController = require('../controllers/orderCustomars.controller');
const ordersCustomerController = new OrdersCustomerController();

// 손님이 버튼 클릭해서 실제로 주문 완료
router.post(
  '/store/:storeId/:menuorderId',
  authMiddleware,
  ordersCustomerController.postOrder
);
// 손님이 주문한 내역들 보기
router.get(
  '/store/:storeId/:ordercustomerId',
  authMiddleware,
  ordersCustomerController.getOrder
);

// 사장이 버튼 클릭해서 배달 완료
router.put(
  '/store/:storeId/:ordercustomerId',
  authMiddleware,
  roleMiddleware,
  ordersCustomerController.updateState
);

module.exports = router;
