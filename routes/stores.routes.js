const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');
const roleMiddleware = require('../middlewares/role-middleware.js');
const StoresController = require('../controllers/stores.controller.js');
const storesController = new StoresController();

// 내 가게 조회
router.get(
  '/:storeId',
  authMiddleware,
  roleMiddleware,
  storesController.getStore
);

// 모든 가게 조회
router.get('/', storesController.findStores);

//키워드로 가게이름 , 메뉴이름 검색기능
router.get('/store/keyword', storesController.findkeyword);

router.post('/', authMiddleware, roleMiddleware, storesController.createStore);
router.patch(
  '/:storeId',
  authMiddleware,
  roleMiddleware,
  storesController.updatestore
);
router.delete(
  '/:storeId',
  authMiddleware,
  roleMiddleware,
  storesController.deleteStore
);

module.exports = router;
