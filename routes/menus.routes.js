const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');
const roleMiddleware = require('../middlewares/role-middleware');
const { upload } = require('../s3/image.s3');

const MenusController = require('../controllers/menus.controller');
const menusController = new MenusController();

// 전체 메뉴 조회
router.get('/store/:storeId/menus', authMiddleware, menusController.GetMenus);

// 메뉴 추가
router.post(
  '/store/:storeId/menu',
  authMiddleware,
  roleMiddleware,
  menusController.PostMenu
);

// 메뉴 수정
router.patch(
  '/store/:storeId/menu/:menuId',
  authMiddleware,
  roleMiddleware,
  menusController.updateMenu
);

// 메뉴 삭제
router.delete(
  '/store/:storeId/menu/:menuId',
  authMiddleware,
  roleMiddleware,
  menusController.DeleteMenu
);

// 이미지 업로드
router.post('/123', upload.single('img'), (req, res) => {
  console.log(req.file);
});

module.exports = router;
