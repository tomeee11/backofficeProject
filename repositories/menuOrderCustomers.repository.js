const {
  menuOrderCustomers,
  OrderCustomers,
  Stores,
  Menus,
} = require('../models');
const { Op } = require('sequelize');

class CustomerOrderRepository {
  // 고객 본인 장바구니 조회
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

  // 장바구니 담기
  createorder = async (userId, storeId, menuId) => {
    const order = await menuOrderCustomers.create({
      UserId: userId,
      StoreId: storeId,
      MenuId: menuId,
    });
    return order;
  };

  // menuId 값으로 메뉴 존재 유무 조회
  getMenu = async menuId => {
    const menu = await Menus.findOne({
      where: { menuId },
    });
    console.log(menu.menuId);
    return menu;
  };

  // 가게 유무 조회
  findStore = async storeId => {
    const store = await Stores.findOne({ where: { storeId } });
    console.log(store.storeId);
    return store;
  };

  // 장바구니 삭제
  destroyorder = async (menuId, menuorderId) => {
    const order = await menuOrderCustomers.destroy({
      where: { [Op.and]: [{ MenuId: menuId }, { menuorderId }] },
    });
    return order;
  };

  // 장바구니 메뉴 갯수 추가, 감소
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
