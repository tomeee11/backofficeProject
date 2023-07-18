'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1. Users 모델에서
      this.belongsTo(models.Users, {
        sourceKey: 'userId', //
        foreignKey: 'UserId', //
      });
      this.belongsTo(models.Stores, {
        sourceKey: 'storeId', //
        foreignKey: 'StoreId', //
      });
    }
  }

  Menus.init(
    {
      menuId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      StoreId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      menuImage: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      menuName: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      menuPoint: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
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
      modelName: 'Menus',
    }
  );
  return Menus;
};
