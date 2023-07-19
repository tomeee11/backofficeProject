const express = require('express');
const router = express.Router();
const MenusController = require('../controllers/menus.controller');
const menusController = new MenusController();
const { upload } = require('../s3/image.s3');

router.post('/store/:storeId/menu', menusController.PostMenus);
router.get('/store/:storeId/menu/:menuId', menusController.GetMenus);
router.put('/store/:storeId/menu/:menuId', menusController.PutMenus);
router.delete('/store/:storeId/menu/:menuId', menusController.DeleteMenus);
router.post('/123', upload.single('img'), (req, res) => {
  console.log(req.file);
});
module.exports = router;
