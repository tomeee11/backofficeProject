const express = require('express');
const router = express.Router();

const storesRouter = require('./stores.routes');
router.use('/', storesRouter);

const menusRouter = require('./menus.routes');
router.use('/', menusRouter);

const userRouter = require('./users.route');
router.use('/', userRouter);

const menuOrderCustomersRouter = require('./menuOrderCustomers.routes');
router.use('/', menuOrderCustomersRouter);

const reviewsRouter = require('./reviews.routes');
router.use('/', reviewsRouter);

const ordercustomerRouter = require('./orderCustomars.routes');
router.use('/', ordercustomerRouter);

module.exports = router;
