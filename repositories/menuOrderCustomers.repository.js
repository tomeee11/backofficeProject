const {
  menuOrderCustomers,
  OrderCustomers,
  Stores,
  Menus,
} = require('../models');
const { Op } = require('sequelize');

class CustomerOrderRepository {
  createorder = async (userId, storeId, menuId) => {
    const order = await menuOrderCustomers.create({
      UserId: userId,
      StoreId: storeId,
      MenuId: menuId,
    });
    return order;
  };

  findAll = async (userId, storeId, menuId) => {
    const findorder = await menuOrderCustomers.findAll({});
    return findorder;
  };
  userAll = async (userId, storeId) => {
    const findorder = await menuOrderCustomers.findAll({
      include: [
        {
          model: Menus,
          attributes: [
            'UserId',
            'StoreId',
            'menuImage',
            'menuName',
            'menuPoint',
          ],
          as: 'Menu',
          where: { [Op.and]: [{ UserId: userId }, { StoreId: storeId }] },
        },
      ],
    });
    return findorder;
  };

  // userAll = async (userId, storeId) => {
  //   const findorder = await Menus.findAll({
  //     where: { [Op.and]: [{ UserId: userId }, { StoreId: storeId }] },
  //   });
  //   return findorder;
  // };

  findAllStore = async (storeId, menuId) => {
    const findstore = await Stores.findAll({
      where: { [Op.and]: [{ UserId: storeId }, { MenuId: menuId }] },
    });
    return findstore;
  };

  destroyorder = async (menuId, menuorderId) => {
    const order = await menuOrderCustomers.destroy({
      where: { [Op.and]: [{ MenuId: menuId }, { menuorderId }] },
    });
    return order;
  };

  getAmount = async (menuId, menuorderId) => {
    const amount = await menuOrderCustomers.findOne({
      where: { [Op.and]: [{ MenuId: menuId }, { menuorderId }] },
    });
    return amount;
  };

  signAmount = async (menuId, menuorderId, plusA) => {
    const order = await menuOrderCustomers.update(
      { amount: plusA },
      {
        where: { [Op.and]: [{ MenuId: menuId }, { menuorderId: menuorderId }] },
      }
    );
    return order;
  };
}
module.exports = CustomerOrderRepository;
