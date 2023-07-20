const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const MenuOrderCustomersController = require('../controllers/menuOrderCustomers.controller');
const menuOrdercustomersController = new MenuOrderCustomersController();

// 고객 본인 장바구니 조회
router.get(
  '/:storeId/menuOrder/guest',
  authMiddleware,
  menuOrdercustomersController.getOrderUser
);

// 장바구니 담기
router.post(
  '/:storeId/menuOrder',
  authMiddleware,
  menuOrdercustomersController.postorder
);

// 장바구니 삭제
router.delete(
  '/:storeId/menuOrder',
  authMiddleware,
  menuOrdercustomersController.deleteorder
);

// 장바구니 메뉴 갯수 추가, 감소
router.put(
  '/:storeId/menuOrder/sign',
  authMiddleware,
  menuOrdercustomersController.signAmount
);

module.exports = router;
