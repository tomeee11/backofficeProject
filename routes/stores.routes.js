const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');
const roleMiddleware = require('../middlewares/role-middleware.js');

const StoresController = require('../controllers/stores.controller.js');
const storesController = new StoresController();

// 모든 가게 조회
router.get('/stores', storesController.findStores);

// 내 가게 조회
router.get(
  '/:storeId',
  authMiddleware,
  roleMiddleware,
  storesController.getStore
);

// 키워드로 가게이름 , 메뉴이름 검색기능
router.get('/store/keyword', storesController.findkeyword);

// 가게 생성
router.post(
  '/store',
  authMiddleware,
  roleMiddleware,
  storesController.createStore
);

// 가게 이름 수정
router.put(
  '/:storeId',
  authMiddleware,
  roleMiddleware,
  storesController.updatestore
);

// 가게 삭제
router.delete(
  '/:storeId',
  authMiddleware,
  roleMiddleware,
  storesController.deleteStore
);

module.exports = router;
