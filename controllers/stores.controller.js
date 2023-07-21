// 사장님 롤을 포함
const StoresService = require('../services/stores.service');

class StoresController {
  storesService = new StoresService();

  // 모든 가게 조회
  findStores = async (req, res, next) => {
    const { status, message, allStore } = await this.storesService.findStores();
    res.status(status).json({ message, allStore });
  };

  // 내 가게 조회 (상세 조회)
  getStore = async (req, res, next) => {
    const { storeId } = req.params;
    const { status, message, store } = await this.storesService.findstore(
      storeId
    );
    res.status(status).json({ message, store });
  };

  findkeyword = async (req, res, next) => {
    const { keyword } = req.body;
    const { status, message, stores } = await this.storesService.findkeyword(
      keyword
    );
    res.status(status).json({ message, stores });
  };

  // 가게 생성
  createStore = async (req, res, next) => {
    const { storeName } = req.body;
    const { userId } = res.locals.user;
    const { status, message } = await this.storesService.createStore(
      storeName,
      userId
    );

    res.status(status).json({ message });
  };

  // 가게 이름 수정
  updatestore = async (req, res, next) => {
    const { storeId } = req.params;
    const { storeName } = req.body;
    const { userId } = res.locals.user;
    const { status, message } = await this.storesService.updatestore(
      storeId,
      storeName,
      userId
    );
    res.status(status).json({ message });
  };

  // 가게 삭제
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
