const { CostExplorer } = require('aws-sdk');
const MenusRepository = require('../repositories/menus.repository');

class MenusService {
  menusRepository = new MenusRepository();

  PostMenus = async (userId, image, storeId, name, point) => {
    try {
      const createMenu = await this.menusRepository.createMenu(
        userId,
        image,
        storeId,
        name,
        point
      );
      return {
        status: 200,
        message: '메뉴 생성에 성공하였습니다.',
        createMenu,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '메뉴 생성에 실패하였습니다.',
      };
    }
  };

  GetMenus = async storeId => {
    const findmenu = await this.menusRepository.findAllMenu(storeId);
    try {
      // if (!findmenu) {
      //   return {
      //     status: 412,
      //     message: '가게가 존재하지 않습니다.',
      //   };
      // }
      findmenu.sort((a, b) => {
        return b.point - a.point;
      });
      const allMenus = findmenu.map(menus => {
        return {
          menuId: menus.menuId,
          UserId: menus.UserId,
          StoreId: menus.StoreId,
          menuImage: menus.menuImage,
          menuName: menus.menuName,
          menuPoint: menus.menuPoint,
          status: menus.status,
          createdAt: menus.createdAt,
          updatedAt: menus.updatedAt,
        };
      });
      return {
        status: 200,
        message: allMenus,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: '메뉴 조회에 실패하였습니다.',
      };
    }
  };

  PutMenus = async (storeId, menuId, image, name, point) => {
    const menu = await this.menusRepository.findOneMenu(menuId);
    try {
      if (!menu) {
        return {
          status: 412,
          message: '메뉴가 존재하지 않습니다.',
        };
      }
      await this.menusRepository.updateMenu(
        storeId,
        menuId,
        image,
        name,
        point
      );

      return {
        status: 200,
        message: '메뉴 수정에 성공하였습니다.',
      };
    } catch (e) {
      return {
        status: 400,
        message: '메뉴 수정에 실패하였습니다.',
      };
    }
  };

  DeleteMenus = async (storeId, menuId) => {
    const menu = await this.menusRepository.findOneMenu(menuId);
    try {
      if (!menu) {
        return {
          status: 412,
          message: '메뉴가 존재하지 않습니다.',
        };
      }
      const destroymenu = await this.menusRepository.destroyMenu(
        storeId,
        menuId
      );
      return {
        status: 200,
        message: '메뉴 삭제에 성공하였습니다.',
      };
    } catch (e) {
      return {
        status: 400,
        message: '메뉴 삭제에 실패하였습니다',
      };
    }
  };
}

module.exports = MenusService;
