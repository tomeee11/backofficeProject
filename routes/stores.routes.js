const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');

const StoresController = require('../controllers/stores.controller.js');
const storesController = new StoresController();

// 내 가게 조회
router.get('/:storeId', storesController.getStore);

// 모든 가게 조회
router.get('/', storesController.findStores);

router.post('/', authMiddleware, storesController.createStore);
router.patch('/:storeId', authMiddleware, storesController.updatestore);
router.delete('/:storeId', authMiddleware, storesController.deleteStore);

module.exports = router;
