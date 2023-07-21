// 장바구니에 상품 담는 로직

const express = require('express');
const router = express.Router();
const MenuOrderCustomersController = require('../controllers/menuOrderCustomers.controller');
const authMiddleware = require('../middlewares/auth-middleware');
const menuOrdercustomersController = new MenuOrderCustomersController();

// 주문 내역을 모두 조회(사장)
router.get(
  '/:storeId/menuOrder/owner',
  authMiddleware,
  menuOrdercustomersController.getorder
);

// 손님 본인 장바구니 조회
router.get(
  '/:storeId/menuOrder/guest',
  authMiddleware,
  menuOrdercustomersController.getOrderUser
);

// 장바구니에 담는 행동
router.post(
  '/:storeId/menuOrder',
  authMiddleware,
  menuOrdercustomersController.postorder
);

router.delete(
  '/:storeId/menuOrder',
  authMiddleware,
  menuOrdercustomersController.deleteorder
);

// +, - 판별
router.put(
  '/:storeId/menuOrder/sign',
  authMiddleware,
  menuOrdercustomersController.signAmount
);

module.exports = router;
