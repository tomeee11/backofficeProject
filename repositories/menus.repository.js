const { Users, Stores, Menus } = require('../models');
const { Op } = require('sequelize');
class MenusRepository {
  createMenu = async (userId, image, storeId, name, point) => {
    const createmenu = await Menus.create({
      UserId: userId,
      StoreId: storeId,
      menuImage: image,
      menuName: name,
      menuPoint: point,
    });
    return createmenu;
  };

  findAllMenu = async stordId => {
    const findallmenu = await Menus.findAll({
      where: { stordId },
      include: [{ Users }, { Stores }],
    });
    return findallmenu;
  };

  findOneMenu = async storeId => {
    const findonemenu = await Menus.findOne({ where: { storeId } });
    return findonemenu;
  };

  updateMenu = async (storeId, menuId, image, name, point) => {
    const updatemenu = await Menus.update(
      { name, point, image },
      { where: { [Op.and]: [{ storeId }, { menuId }] } }
    );
    return updatemenu;
  };

  destroyMenu = async (storeId, menuId) => {
    const destroymenu = await Menus.destroy({
      where: { [Op.and]: [{ storeId }, { menuId }] },
    });
    return destroymenu;
  };
}

module.exports = MenusRepository;
