'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.menuOrderCustomers, {
        targetKey: 'ordercustomerId', //
        foreignKey: 'OrdercustomerId', //
      });
    }
  }
  OrderCustomers.init(
    {
      ordercustomerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      state: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'OrderCustomers',
    }
  );
  return OrderCustomers;
};
