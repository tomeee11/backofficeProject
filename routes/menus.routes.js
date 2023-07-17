const express = require('express');
const router = express.Router();
const MenusController = require('../controllers/menus.controller');
const menusController = new MenusController();

router.post('/store/:storeId/menu/', menusController.PostMenus);
router.get('/store/:storeId/menu/:menuId', menusController.GetMenus);
router.put('/store/:storeId/menu/:menuId', menusController.PutMenus);
router.delete('/store/:storeId/menu/:menuId', menusController.DeleteMenus);
module.exports = router;
