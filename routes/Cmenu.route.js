const express = require('express');
const router = express.Router();
const CMenusController = require('../controllers/Cmenu.controller');
const cmenusController = new CMenusController();

router.post('/customer/:storeId/menu/', cmenusController.PostMenu);
router.get('/customer/:storeId/menu/:menuId', cmenusController.GetMenu);
module.exports = router;
