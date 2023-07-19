'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      orderId: {
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
      MenuId: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false, // NOT NULL
        defaultValue: 0,
        type: Sequelize.STRING,
      },
      totalpoint: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
