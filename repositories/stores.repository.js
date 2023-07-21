const { Sequelize } = require('sequelize');
const { Stores } = require('../models');
const { Op } = require('sequelize');

class StoresRepository {
  // 모든 가게 조회
  findStores = async () => {
    const stores = await Stores.findAll({
      order: [['createdAt', 'desc']],
    });
    return stores;
  };

  // 내 가게 조회 (상세 조회)
  findStore = async storeId => {
    const store = await Stores.findOne({ where: { storeId } });
    return store;
  };

  findkeyword = async keyword => {
    const query = `
    SELECT *
    FROM Stores
    LEFT JOIN Menus ON Stores.storeId = Menus.StoreId
    WHERE Stores.storeName LIKE '%${keyword}%' OR Menus.menuName LIKE '%${keyword}%'
    `;

    const [results, metadata] = await Stores.sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });

    return results;
  };

  // 새로운 가게 생성
  createStore = async (storeName, userId) => {
    const result = await Stores.create({ UserId: userId, storeName });
    return result;
  };

  // 현재 로그인한 userId값으로 가게 존재 유무 확인
  findOneStore = async userId => {
    const stores = await Stores.findOne({ where: { UserId: userId } });
    return stores;
  };

  // 가게 이름 수정
  updateStore = async (storeId, storeName) => {
    await Stores.update({ storeName }, { where: { storeId } });
  };

  // 가게 삭제
  deleteStore = async storeId => {
    await Stores.destroy({
      where: { storeId },
    });
  };
}
module.exports = StoresRepository;
