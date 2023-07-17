const express = require('express');
const router = express.Router();
const MenusController = require('../controllers/menus.controller');
const menusController = new MenusController();

router.post('/store/menu');

module.exports = router;
