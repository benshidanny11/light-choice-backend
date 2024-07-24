'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appeal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appeal.init({
    aid:{
     type: DataTypes.STRING,
     primaryKey:true
    },
    requesterid: DataTypes.STRING,
    orderid: DataTypes.STRING,
    appealmsg: DataTypes.STRING,
    appealreason: DataTypes.STRING,
    appealstatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Appeal',
  });
  return Appeal;
};