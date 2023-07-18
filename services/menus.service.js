const MenusRepository = require('../repositories/menus.repository');

class MenusService {
  menusRepository = new MenusRepository();

  PostMenus = async (userId, image, storeId, name, point) => {
    await this.menusRepository.createMenu(userId, image, storeId, name, point);
  };

  GetMenus = async (storeId, menuId) => {
    const menu = await this.menusRepository.findOneMenu(menuId);
    const findmenu = await this.menusRepository.findAllMenu(storeId);
    if (!menu) throw new Error('메뉴가 존재하지 않습니다.');
    if (!findmenu) throw new Error('가게가 존재하지 않습니다.');
    findmenu.sort((a, b) => {
      return b.point - a.point;
    });

    return findmenu.map(menus => {
      return {
        UserId: menus.UserId,
        StoreId: menus.PostId,
        menuImage: menus.menuImage,
        menuName: menus.menuName,
        menuPoint: menus.menuPoint,
        createdAt: menus.createdAt,
        updatedAt: menus.updatedAt,
      };
    });
  };

  PutMenus = async (storeId, menuId, image, name, point) => {
    const menu = await this.menusRepository.findOneMenu(menuId);
    if (!menu) throw new Error('메뉴가 존재하지 않습니다.');
    await this.menusRepository.updateMenu(storeId, menuId, image, name, point);
  };

  DeleteMenus = async (storeId, menuId) => {
    const menu = await this.menusRepository.findOneMenu(menuId);
    if (!menu) throw new Error('메뉴가 존재하지 않습니다.');
    await this.menusRepository.destroyMenu(storeId, menuId);
  };
}

module.exports = MenusService;
