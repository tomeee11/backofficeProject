'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menuOrderCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Menus, {
        sourceKey: 'menuId', //
        foreignKey: 'MenuId', //
      });

      this.belongsTo(models.OrderCustomers, {
        sourceKey: 'ordercustomerId', //
        foreignKey: 'OrdercustomerId', //
      });
    }
  }

  menuOrderCustomers.init(
    {
      menuorderId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      MenuId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      OrdercustomerId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'menuOrderCustomers',
    }
  );
  return menuOrderCustomers;
};
