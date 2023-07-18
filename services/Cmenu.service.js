const CMenusRepository = require('../repositories/Cmenu.repository');

class CMenusService {
  cmenusRepository = new CMenusRepository();

  PostMenu = async (userId, image, storeId, name, point) => {
    await this.cmenusRepository.createMenu(userId, image, storeId, name, point);
  };

  GetMenu = async (storeId, menuId) => {
    const menu = await this.cmenusRepository.findOneMenu(menuId);
    const findmenu = await this.cmenusRepository.findAllMenu(storeId);
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
}
module.exports = CMenusService;
