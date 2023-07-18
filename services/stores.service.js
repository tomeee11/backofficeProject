const StoresRepository = require('../repositories/stores.repository');

class StoresService {
  storesRepository = new StoresRepository();
  findStores = async () => {
    try {
      // 저장소(Repository)에게 데이터를 요청합니다.
      const allStore = await this.storesRepository.findStores();
      // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
      const stores = allStore.map(post => {
        return {
          storeId: post.storeId,
          storeName: post.storeName,
          UserId: post.UserId,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      });
      return {
        status: 200,
        message: '모든 가게가 조회되었습니다',
        stores,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '가게 조회에 실패했습니다',
      };
    }
  };
  findstore = async storeId => {
    try {
      const store = await this.storesRepository.findStore(storeId);
      if (!store) {
        return {
          status: 404,
          message: '사장님의 가게가 존재하지 않습니다',
        };
      }
      const stores = {
        storeId: store.null,
        UserId: store.UserId,
        storeName: store.storeName,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt,
      };
      return {
        status: 200,
        message: '사장님의 가게가 조회되었습니다',
        stores,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '가게 조회에 실패했습니다',
      };
    }
  };

  createStore = async (userId, storeName) => {
    try {
      const store = await this.storesRepository.findStore(userId);

      if (store != null) {
        return {
          status: 404,
          message: '사장님의 가게가 이미 존재합니다',
        };
      }

      const newstore = await this.storesRepository.createStore(
        userId,
        storeName
      );

      const stores = newstore.map(z => {
        return {
          storeId: z.storeId,
          UserId: z.UserId,
          storeName: z.storeName,
          createdAt: z.createdAt,
          updatedAt: z.updatedAt,
        };
      });
      return {
        status: 200,
        message: '사장님의 가게가 새로 생성되었습니다',
        stores,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '가게 생성에 실패하였습니다',
      };
    }
  };

  updatestore = async (storeId, userId, storeName) => {
    try {
      if (!storeName) {
        return {
          status: 400,
          message: '변경 할 가게 이름의 형식이 일치하지 않습니다',
        };
      }
      const store = await this.storesRepository.findstore(userId);

      if (!store) {
        return {
          status: 401,
          message: '가게 이름을 수정할 권한이 없습니다',
        };
      }

      //저장소에게 데이터 요청
      await this.storesRepository.updatestore(storeId, storeName);
      return {
        status: 201,
        message: '가게 이름 수정에 성공했습니다',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '가게 이름 수정에 실패했습니다',
      };
    }
  };

  deleteStore = async (storeId, userId) => {
    try {
      const store = await this.storesRepository.findstore(storeId);
      if (store.UserId !== userId) {
        return {
          status: 403,
          message: '가게 삭제 권한이 없습니다',
        };
      }
      await this.storesRepository.deleteStore(storeId);
      return {
        status: 201,
        message: '가게 삭제에 성공했습니다',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 401,
        message: '가게가 정상적으로 삭제되지 않았습니다',
      };
    }
  };
}

module.exports = StoresService;
