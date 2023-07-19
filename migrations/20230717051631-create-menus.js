'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      menuId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      StoreId: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      menuImage: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      menuName: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      menuPoint: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  },
};
