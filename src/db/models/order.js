'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    oid: DataTypes.STRING,
    oprescription: DataTypes.STRING,
    ostatus: DataTypes.STRING,
    oaddress: DataTypes.STRING,
    opaymentref: DataTypes.STRING,
    oadrress: DataTypes.STRING,
    oamount: DataTypes.DOUBLE,
    orderedby: DataTypes.STRING,
    approvedby: DataTypes.STRING,
    orderpaid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};