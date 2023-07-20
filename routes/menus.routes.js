const express = require('express');
const router = express.Router();
const MenusController = require('../controllers/menus.controller');
const authMiddleware = require('../middlewares/auth-middleware.js');
const menusController = new MenusController();
const { upload } = require('../s3/image.s3');

router.post('/store/:storeId', authMiddleware, menusController.PostMenus);

router.get('/store/:storeId', authMiddleware, menusController.GetMenus);
router.put(
  '/store/:storeId/menu/:menuId',
  authMiddleware,
  menusController.PutMenus
);
router.delete(
  '/store/:storeId/menu/:menuId',
  authMiddleware,
  menusController.DeleteMenus
);

//메뉴 선택해서 상태 변경 (주문0)
router.put(
  '/store/:storeId/menu/:menuId/statusOn',
  authMiddleware,
  menusController.PutStatus
);

router.post('/123', upload.single('img'), (req, res) => {
  console.log(req.file);
});

module.exports = router;
