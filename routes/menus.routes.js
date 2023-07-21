const express = require('express');
const router = express.Router();
const MenusController = require('../controllers/menus.controller');
const authMiddleware = require('../middlewares/auth-middleware.js');
const roleMiddleware = require('../middlewares/role-middleware');
const menusController = new MenusController();
const { upload } = require('../s3/image.s3');

router.post(
  '/store/:storeId',
  authMiddleware,
  roleMiddleware,
  menusController.PostMenus
);

router.get('/store/:storeId/menu', authMiddleware, menusController.GetMenus);
router.put(
  '/store/:storeId/menu/:menuId',
  authMiddleware,
  roleMiddleware,
  menusController.PutMenus
);
router.delete(
  '/store/:storeId/menu/:menuId',
  authMiddleware,
  roleMiddleware,
  menusController.DeleteMenus
);

router.post('/123', upload.single('img'), (req, res) => {
  console.log(req.file);
});

module.exports = router;
