const { Users, Stores, Menus } = require('../models');
const { Op } = require('sequelize');
class MenusRepository {
  // 가게 전체 메뉴 조회
  findAllMenu = async storeId => {
    const findAllMenus = await Menus.findAll({
      where: { StoreId: storeId },
      attributes: [
        'menuId',
        'UserId',
        'StoreId',
        'menuName',
        'menuPoint',
        'menuImage',
        'createdAt',
        'updatedAt',
      ],
      order: [['menuPoint', 'desc']],
    });
    return findAllMenus;
  };

  // 메뉴 추가
  createMenu = async (userId, storeId, name, Point, Image) => {
    const createmenu = await Menus.create({
      UserId: userId,
      StoreId: storeId,
      menuName: name,
      menuPoint: Point,
      menuImage: Image,
    });
    return createmenu;
  };

  // 가게 유무 조회
  getStore = async storeId => {
    const store = await Stores.findOne({ where: { storeId } });
    return store;
  };

  // 메뉴 유무 조회
  findOneMenu = async menuId => {
    const findOneMenu = await Menus.findOne({
      where: { menuId },
    });
    return findOneMenu;
  };

  // 메뉴 수정
  updateMenu = async (storeId, menuId, menuName, menuPoint, menuImage) => {
    const updatemenu = await Menus.update(
      { menuName: menuName, menuPoint: menuPoint, menuImage: menuImage },
      { where: { [Op.and]: [{ StoreId: storeId }, { menuId: menuId }] } }
    );
    return updatemenu;
  };

  // 메뉴 삭제
  destroyMenu = async (storeId, menuId) => {
    const destroymenu = await Menus.destroy({
      where: { [Op.and]: [{ StoreId: storeId }, { menuId: menuId }] },
    });
    return destroymenu;
  };
}

module.exports = MenusRepository;
