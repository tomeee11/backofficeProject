const { Users, Stores, Menus } = require('../models');
class CMenusRepository {
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
}
module.exports = CMenusRepository;
