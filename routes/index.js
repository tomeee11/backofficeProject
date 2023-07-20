const express = require('express');
const router = express.Router();

const storesRouter = require('./stores.routes');
router.use('/stores', storesRouter);

const menusRouter = require('./menus.routes');
router.use('/menus', menusRouter);

const userRouter = require('./users.route');
router.use('/', userRouter);

const menuOrderCustomersRouter = require('./menuOrderCustomers.routes');
router.use('/menuOrderCustomers', menuOrderCustomersRouter);

const reviewsRouter = require('./reviews.routes');
router.use('/reviews', reviewsRouter);

const ordercustomerRouter = require('./orderCustomars.routes');
router.use('/ordercustomers', ordercustomerRouter);

module.exports = router;
