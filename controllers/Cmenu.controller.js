const CMenusService = require('../services/Cmenu.service');

class CMenusController {
  cmenusService = new CMenusService();

  PostMenu = async (req, res, next) => {
    const { name, point, image } = req.body;
    const { userId } = res.locals.user;
    const { storeId } = req.params;
    if (!name) {
      res.status(412).json({ errorMessage: '메뉴 이름을 입력해주세요.' });
    }
    if (!point) {
      res.status(412).json({ errorMessage: '메뉴 가격을 입력해주세요.' });
    }
    try {
      const menu = await this.cmenusService
        .PostMenu(userId, image, storeId, name, point)
        .catch(e => res.status(412).json({ errorMessage: menu }));
      res.status(201).json({ message: '메뉴를 성공적으로 생성하였습니다.' });
    } catch (error) {
      res.status(400).json({ errorMessage: '메뉴 생성에 실패하였습니다.' });
    }
  };

  GetMenu = async (req, res, next) => {
    const { storeId, menuId } = req.params;
    try {
      const getmenu = await this.cmenusService
        .GetMenu(storeId, menuId)
        .catch(e => res.status(412).json({ errorMessage: getmenu }));
      res.status(200).json({ data: getmenu });
    } catch (error) {
      res.status(400).json({ errorMessage: '메뉴 조회에 실패하였습니다.' });
    }
  };
}

module.exports = CMenusController;
