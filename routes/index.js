const express = require('express');
const router = express.Router();

const storesRouter = require('./stores.routes');
router.use('/', storesRouter);

const menusRouter = require('./menus.routes');
router.use('/', menusRouter);

const userRouter = require('./users.route');
router.use('/', userRouter);

// const ordersRouter = require('./orders.routes');
// router.use('/orders/', ordersRouter);

const reviewsRouter = require('./reviews.routes');
router.use('/', reviewsRouter);

module.exports = router;
