'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentTrasaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentTrasaction.init({
    payid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    paidby: DataTypes.STRING,
    orderid: DataTypes.STRING,
    paymentstatus: DataTypes.STRING,
    paymentref: DataTypes.STRING,
    paymentmode: DataTypes.STRING,
    transactionamout: DataTypes.DOUBLE,
    accountdebited: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentTrasaction',
  });
  return PaymentTrasaction;
};