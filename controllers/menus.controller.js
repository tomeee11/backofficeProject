const MenusService = require('../services/menus.service');

class MenusController {
  menusService = new MenusService();

  PostMenus = async (req, res, next) => {
    const { name, Point, Image } = req.body;
    const { userId } = res.locals.user;
    const { storeId } = req.params;

    const { status, message } = await this.menusService.PostMenus(
      userId,
      Image,
      storeId,
      name,
      Point
    );
    res.status(status).json({ message });
  };

  GetMenus = async (req, res, next) => {
    const { storeId } = req.params;
    const { image, name, point } = req.body;
    const { status, message } = await this.menusService.GetMenus(
      storeId,
      image,
      name,
      point
    );
    res.status(status).json({ message });
  };

  PutMenus = async (req, res, next) => {
    const { point, image, name } = req.body;
    const { storeId, menuId } = req.params;

    const { status, message } = await this.menusService.PutMenus(
      storeId,
      menuId,
      point,
      image,
      name
    );
    res.status(status).json({ message });
  };

  DeleteMenus = async (req, res, next) => {
    const { storeId, menuId } = req.params;

    const { status, message } = await this.menusService.DeleteMenus(
      storeId,
      menuId
    );
    res.status(status).json({ message });
  };
}

module.exports = MenusController;
