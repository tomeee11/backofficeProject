const { Stores } = require('../models');

class StoresRepository {
  findStores = async () => {
    const stores = await Stores.findAll();
    return stores;
  };
  createStore = async (storename, userId) => {
    await stores.create({ UserId: userId, storename });
  };
  findStore = async storeId => {
    const stores = await Stores.findOne({ where: { storeId } });
    return stores;
  };
  updateStore = async (storeId, storename) => {
    await Stores.update({ storename }, { where: { storeId } });
  };
  deleteStore = async storeId => {
    await Stores.destroy({
      where: { storeId },
    });
  };
}
module.exports = StoresRepository;
