const StoresRepository = require('../repositories/stores.repository');

class StoresService {
  storesRepository = new StoresRepository();

  // 모든 가게 조회
  findStores = async () => {
    try {
      const allStore = await this.storesRepository.findStores();

      if (allStore.length === 0) {
        return {
          status: 400,
          message: '조회 할 가게가 존재하지 않습니다.',
        };
      }

      return {
        status: 200,
        message: '모든 가게가 조회되었습니다.',
        allStore,
      };
    } catch (error) {
      return {
        status: 400,
        message: '가게 조회에 실패했습니다.',
      };
    }
  };

  findkeyword = async keyword => {
    try {
      const stores = await this.storesRepository.findkeyword(keyword);
      const storex = [stores];

      const as = storex.map(store => ({
        storeId: store.StoreId,
        menuId: store.menuId,
      }));

      return {
        status: 200,
        message: '검색이 성공하였습니다',
        stores: as,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '키워드 검색에 실패하였습니다',
      };
    }
  };

  // 내 가게 조회 (상세 조회)
  findstore = async storeId => {
    try {
      // storeId 값으로 가게 조회
      const store = await this.storesRepository.findStore(storeId); // findStore로 넘어가서 새로 수정

      if (!store) {
        return {
          status: 404,
          message: '조회하신 가게가 존재하지 않습니다.',
        };
      }

      return {
        status: 200,
        message: '사장님의 가게가 조회되었습니다.',
        store,
      };
    } catch (error) {
      return {
        status: 400,
        message: '가게 조회에 실패했습니다.',
      };
    }
  };

  // 가게 생성
  createStore = async (userId, storeName) => {
    console.log(userId);
    try {
      // 현재 로그인한 userId값으로 가게 존재 유무 확인
      // 생성할 때 storeId 값을 안받아오기 때문에 userId값으로 가게 존재 유무 확인
      const store = await this.storesRepository.findOneStore(userId);
      console.log(store);

      if (store != null) {
        return {
          status: 404,
          message: '사장님의 가게가 이미 존재합니다.',
        };
      }

      // if (store.storeName !== storeName) {
      //   return {
      //     status: 401,
      //     message: '동일한 가게 이름이 존재합니다.',
      //   };
      // }

      // 새로운 가게 생성
      const newstore = await this.storesRepository.createStore(
        userId,
        storeName
      );

      return {
        status: 200,
        message: '사장님의 가게가 새로 생성되었습니다.',
        newstore,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '가게 생성에 실패하였습니다.',
      };
    }
  };

  updatestore = async (storeId, storeName, userId) => {
    try {
      if (!storeName) {
        return {
          status: 400,
          message: '가게 이름을 작성해주세요.',
        };
      }

      // storeId 값으로 가게 조회
      const store = await this.storesRepository.findStore(storeId);
      if (!store) {
        return {
          status: 401,
          message: '사장님의 가게를 찾을 수 없습니다.',
        };
      }
      if (store.UserId !== userId) {
        return {
          status: 401,
          message: '가게 이름 수정 권한이 없습니다.',
        };
      }
      // if (store.storeName !== storeName) {
      //   return {
      //     status: 401,
      //     message: '동일한 가게 이름이 존재합니다.',
      //   };
      // }

      await this.storesRepository.updateStore(storeId, storeName);
      return {
        status: 201,
        message: '가게 이름 수정에 성공했습니다.',
      };
    } catch (error) {
      return {
        status: 400,
        message: '가게 이름 수정에 실패했습니다.',
      };
    }
  };

  // 가게 삭제
  deleteStore = async (storeId, userId) => {
    try {
      // storeId 값으로 가게 조회
      const store = await this.storesRepository.findStore(storeId);

      if (!store) {
        return {
          status: 401,
          message: '사장님의 가게를 찾을 수 없습니다.',
        };
      }
      if (store.UserId !== userId) {
        return {
          status: 403,
          message: '가게 삭제 권한이 없습니다.',
        };
      }

      await this.storesRepository.deleteStore(storeId);
      return {
        status: 201,
        message: '가게 삭제에 성공했습니다.',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 401,
        message: '가게 삭제에 실패하였습니다.',
      };
    }
  };
}

module.exports = StoresService;
