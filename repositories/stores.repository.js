const { Stores } = require('../models');

class StoresRepository {
  findStores = async () => {
    const stores = await Stores.findAll();
    return stores;
  };
  createStore = async (userId, storeName) => {
    const result = await Stores.create({ UserId: userId, storeName });
    return result;
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
