const { menuOrderCustomers, OrderCustomers, Stores } = require('../models');
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
  getAmount = async menuId => {
    const amount = await menuOrderCustomers.findOne({
      where: { MenuId: menuId },
    });
    return amount;
  };

  plusAmount = async (menuId, menuorderId, plusA) => {
    const order = await menuOrderCustomers.update(
      { amount: plusA },
      {
        where: { [Op.and]: [{ MenuId: menuId }, { menuorderId: menuorderId }] },
      }
    );
    return order;
  };

  minusAmount = async (menuId, menuorderId, minusA) => {
    const order = await menuOrderCustomers.update(
      { amount: minusA },
      { where: { [Op.and]: [{ MenuId: menuId }, { menuorderId }] } }
    );
    return order;
  };
}
module.exports = CustomerOrderRepository;
