// 사장님 롤을 포함
const StoresService = require('../services/stores.service');

class StoresController {
  storesService = new StoresService();
  findStores = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const { status, message, stores } = await this.storesService.findStores();
    res.status(status).json({ message, stores });
  };

  getStore = async (req, res, next) => {
    const { storeId } = req.params;
    const { status, message, stores } = await this.storesService.findstore(
      storeId
    );
    res.status(status).json({ message, stores });
  };

  findkeyword = async (req, res, next) => {
    const { keyword } = req.body;
    const { status, message, stores } = await this.storesService.findkeyword(
      keyword
    );
    res.status(status).json({ message, stores });
  };

  createStore = async (req, res, next) => {
    const { storeName } = req.body;
    const { userId } = res.locals.user;
    console.log(userId);

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const { status, message } = await this.storesService.createStore(
      userId,
      storeName
    );

    res.status(status).json({ message });
  };

  updatestore = async (req, res, next) => {
    const { storeId } = req.params;
    const { storeName } = req.body;
    const { userId } = res.locals.user;
    const { status, message } = await this.storesService.updatestore(
      storeId,
      userId,
      storeName
    );
    res.status(status).json({ message });
  };

  deleteStore = async (req, res, next) => {
    const { storeId } = req.params;
    const { userId } = res.locals.user;
    const { status, message } = await this.storesService.deleteStore(
      storeId,
      userId
    );
    res.status(status).json({ message });
  };
}
module.exports = StoresController;
