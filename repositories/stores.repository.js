const { Sequelize } = require('sequelize');
const { Stores, Menus } = require('../models');

class StoresRepository {
  findStores = async () => {
    const stores = await Stores.findAll();
    return stores;
  };
  createStore = async (userId, storeName) => {
    const result = await Stores.create({ UserId: userId, storeName });
    return result;
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

  findStore = async storeId => {
    const stores = await Stores.findOne({ where: { storeId } });
    return stores;
  };
  updatestore = async (storeId, storeName) => {
    await Stores.update({ storeName }, { where: { storeId } });
  };
  deleteStore = async storeId => {
    await Stores.destroy({
      where: { storeId },
    });
  };
}
module.exports = StoresRepository;
