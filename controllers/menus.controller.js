const MenusService = require('../services/menus.service');

class MenusController {
  menusService = new MenusService();
}

module.exports = MenusController;
