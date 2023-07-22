const {
  OrderCustomers,
  menuOrderCustomers,
  Menus,
  Stores,
  Users,
} = require('../models');
const { sequelize } = require('../models');

class orderCustomarsRepository {
  // 유저포인트값 조회
  getPoint = async userId => {
    const user = await Users.findOne({
      where: {
        userId,
      },
    });
    return user.point;
  };
  // 메뉴포인트값 조회
  getMenuPoint = async (userId, storeId) => {
    const menu = await menuOrderCustomers.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Menus,
          attributes: ['menuPoint'],
          where: { storeId: storeId },
          as: 'Menu',
        },
      ],
    });

    const totalPoint = menu.reduce((acc, item) => acc + item.Menu.menuPoint, 0);

    return totalPoint;
  };

  getAdminPoint = async userId => {
    const user = await Users.findOne({
      where: { userId },
    });
    return user.point;
  };

  updatepoint = async (custoMeruserPoint, menuPoints, userId, storeId) => {
    try {
      await sequelize.transaction(async t => {
        if (custoMeruserPoint >= menuPoints) {
          const usermenupoint = custoMeruserPoint - menuPoints;

          const ppoint = await Users.update(
            {
              point: usermenupoint,
            },
            { where: { userId } },
            { transaction: t }
          );

          //사장님의 point 가져오기
          const adminUser = await Users.findOne({
            include: [
              {
                model: Stores,
                where: { storeId },
              },
            ],
          });

          const adminPoint = adminUser.point;

          // 사장님 포인트 지급
          const addpoint = adminPoint + menuPoints;
          await Users.update(
            {
              point: addpoint,
            },
            { where: { userId: adminUser.userId } },
            { transaction: t }
          );
          return ppoint;
        }
      });
    } catch (Error) {
      console.log(Error);
      throw Error;
    }
  };

  getAdminPoint = async userId => {
    const user = await Users.findOne({
      where: {
        userId,
      },
    });
    return user.point;
  };

  updatedPoint = async (userId, menuId, updatedPoint) => {
    const updatepoint = await Users.update(
      {
        point: updatedPoint,
      },
      { where: { userId } },
      {
        include: [
          {
            model: Menus,
          },
          { where: { menuId } },
        ],
      }
    );
    return updatepoint;
  };

  postOrder = async () => {
    const order = await OrderCustomers.create();
    return order;
  };
  // MenuCostomerOrder 의 OrdercustomerId 를 고쳐줘야함
  putOrdercustomerId = async (menuorderId, ordercustomerId) => {
    const a = await menuOrderCustomers.update(
      { OrdercustomerId: ordercustomerId },
      { where: { menuorderId } }
    );
    return a;
  };

  getOrder = async ordercustomerId => {
    const orders = await OrderCustomers.findAll({ where: { ordercustomerId } });
    return orders;
  };
  findState = async ordercustomerId => {
    const state = await OrderCustomers.findOne({
      where: { ordercustomerId },
    });
    return state;
  };
  // 손님이 주문 버튼 누를때
  updateOrder = async ordercustomerId => {
    const updateorder = await OrderCustomers.update(
      {
        state: 1,
      },
      { where: { ordercustomerId } }
    );
    return updateorder;
  };
}

module.exports = orderCustomarsRepository;
