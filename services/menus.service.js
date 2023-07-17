const MenusRepository = require('../repositories/menus.repository');

class MenusService {
  menusRepository = new MenusRepository();
}

module.exports = MenusService;
