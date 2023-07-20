const { Users, Stores, Menus } = require('../models');
const { Op } = require('sequelize');
class MenusRepository {
  createMenu = async (userId, menuImage, storeId, name, menuPoint) => {
    const createmenu = await Menus.create({
      UserId: userId,
      StoreId: storeId,
      menuImage: menuImage,
      menuName: name,
      menuPoint: menuPoint,
    });
    return createmenu;
  };

  findOneMenu = async menuId => {
    const findOneMenu = await Menus.findOne({
      where: { menuId },
    });
    return findOneMenu;
  };

  findAllMenu = async storeId => {
    const findallmenu = await Menus.findAll({
      where: { StoreId: storeId },
      // include: [{ model: Users }, { model: Stores }],
    });
    return findallmenu;
  };

  updateMenu = async (storeId, menuId, image, name, point) => {
    const updatemenu = await Menus.update(
      { menuName: name, menuPoint: point, menuImage: image },
      { where: { [Op.and]: [{ StoreId: storeId }, { menuId: menuId }] } }
    );
    return updatemenu;
  };

  destroyMenu = async (storeId, menuId) => {
    const destroymenu = await Menus.destroy({
      where: { [Op.and]: [{ StoreId: storeId }, { menuId: menuId }] },
    });
    return destroymenu;
  };

  updateStatus = async (storeId, menu, x) => {
    const update = await Menus.update(
      { status: x },
      { where: { [Op.and]: [{ StoreId: storeId }, { menuId: menu }] } }
    );
  };
}

module.exports = MenusRepository;
