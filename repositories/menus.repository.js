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

  updateMenu = async (storeId, menuId, point, image, name) => {
    const updatemenu = await Menus.update(
      { menuName: name, menuImage: image, menuPoint: point },
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
}

module.exports = MenusRepository;
