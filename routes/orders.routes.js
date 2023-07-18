const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders.controller');
const ordersController = new OrdersController();

router.get('/store/:storeId/:orderId/', ordersController.getStatus);
router.put('/store/:storeId/:orderId/', ordersController.updateStatus);

module.exports = router;
