const { CostExplorer } = require('aws-sdk');
const MenusRepository = require('../repositories/menus.repository');

class MenusService {
  menusRepository = new MenusRepository();

  // 가게 전체 메뉴 조회
  GetMenus = async storeId => {
    try {
      const findAllMenus = await this.menusRepository.findAllMenu(storeId);

      if (findAllMenus.length === 0) {
        return {
          status: 400,
          message: '메뉴가 존재하지 않습니다.',
        };
      }

      return {
        status: 200,
        message: findAllMenus,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '메뉴 조회에 실패하였습니다.',
      };
    }
  };

  // 메뉴 추가
  PostMenu = async (userId, storeId, name, Point, Image) => {
    try {
      // storeId로 가게 존재 유무 확인
      const store = await this.menusRepository.getStore(storeId);

      const createMenu = await this.menusRepository.createMenu(
        userId,
        storeId,
        name,
        Point,
        Image
      );

      if (!store) {
        return {
          status: 400,
          message: '가게가 존재하지 않습니다.',
        };
      }
      if (!name || !Point || !Image) {
        return {
          status: 400,
          message: '모든 양식을 입력해 주세요.',
        };
      }

      return {
        status: 200,
        message: '메뉴 생성에 성공하였습니다.',
        createMenu,
      };
    } catch (error) {
      return {
        status: 400,
        message: '메뉴 생성에 실패하였습니다.',
      };
    }
  };

  // 메뉴 수정
  updateMenu = async (storeId, menuId, menuName, menuPoint, menuImage) => {
    try {
      // storeId로 가게 존재 유무 확인
      const store = await this.menusRepository.getStore(storeId);
      // menuId로 메뉴 존재 유무 확인
      const menu = await this.menusRepository.findOneMenu(menuId);

      if (!store) {
        return {
          status: 400,
          message: '가게가 존재하지 않습니다.',
        };
      }
      if (!menu) {
        return {
          status: 412,
          message: '메뉴가 존재하지 않습니다.',
        };
      }

      await this.menusRepository.updateMenu(
        storeId,
        menuId,
        menuName,
        menuPoint,
        menuImage
      );

      return {
        status: 200,
        message: '메뉴 수정에 성공하였습니다.',
      };
    } catch (error) {
      return {
        status: 400,
        message: '메뉴 수정에 실패하였습니다.',
      };
    }
  };

  // 메뉴 삭제
  DeleteMenu = async (storeId, menuId) => {
    try {
      // storeId로 가게 존재 유무 확인
      const store = await this.menusRepository.getStore(storeId);
      // menuId로 메뉴 존재 유무 확인
      const menu = await this.menusRepository.findOneMenu(menuId);

      if (!store) {
        return {
          status: 400,
          message: '가게가 존재하지 않습니다.',
        };
      }
      if (!menu) {
        return {
          status: 412,
          message: '메뉴가 존재하지 않습니다.',
        };
      }

      await this.menusRepository.destroyMenu(storeId, menuId);
      return {
        status: 200,
        message: '메뉴 삭제에 성공하였습니다.',
      };
    } catch (e) {
      return {
        status: 400,
        message: '메뉴 삭제에 실패하였습니다.',
      };
    }
  };
}

module.exports = MenusService;
