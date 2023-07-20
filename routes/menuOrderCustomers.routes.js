// 장바구니에 상품 담는 로직

const express = require('express');
const router = express.Router();
const MenuOrderCustomersController = require('../controllers/menuOrderCustomers.controller');
const authMiddleware = require('../middlewares/auth-middleware');
const menuOrdercustomersController = new MenuOrderCustomersController();

// 주문 내역을 모두 불러오는 행동(전체조회)
router.get('/:storeId', authMiddleware, menuOrdercustomersController.getorder);

// 주문내역 상세조회

// 장바구니에 담는 행동
router.post(
  '/:storeId',
  authMiddleware,
  menuOrdercustomersController.postorder
);

router.delete(
  '/:storeId',
  authMiddleware,
  menuOrdercustomersController.deleteorder
);

// +, - 판별
router.put(
  '/sign/:storeId',
  authMiddleware,
  menuOrdercustomersController.signAmount
);

module.exports = router;
