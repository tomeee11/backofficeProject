const MenusService = require('../services/menus.service');

class MenusController {
  menusService = new MenusService();

  // 전체 메뉴 조회
  GetMenus = async (req, res, next) => {
    const { storeId } = req.params;
    const { status, message } = await this.menusService.GetMenus(storeId);

    res.status(status).json({ message });
  };

  // 메뉴 추가
  PostMenu = async (req, res, next) => {
    const { name, Point, Image } = req.body;
    const { userId } = res.locals.user;
    const { storeId } = req.params;

    const { status, message } = await this.menusService.PostMenu(
      userId,
      storeId,
      name,
      Point,
      Image
    );
    res.status(status).json({ message });
  };

  // 메뉴 수정
  updateMenu = async (req, res, next) => {
    const { menuName, menuPoint, menuImage } = req.body;
    const { storeId, menuId } = req.params;

    const { status, message } = await this.menusService.updateMenu(
      storeId,
      menuId,
      menuName,
      menuPoint,
      menuImage
    );
    res.status(status).json({ message });
  };

  // 메뉴 삭제
  DeleteMenu = async (req, res, next) => {
    const { storeId, menuId } = req.params;

    const { status, message } = await this.menusService.DeleteMenu(
      storeId,
      menuId
    );
    res.status(status).json({ message });
  };
}

module.exports = MenusController;
